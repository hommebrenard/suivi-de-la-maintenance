import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI Client (server-side only)
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("La clé d'API GEMINI_API_KEY est introuvable dans l'environnement.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API Health Endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Gemini AI Assistance Endpoints
  app.post("/api/ai/analyze", async (req, res) => {
    try {
      const { planningStats, equipmentSummary, query } = req.body;
      const ai = getGeminiClient();

      const prompt = `
Tu es un expert en maintenance industrielle et génie climatique/électrique (GMAO / Preventive Maintenance Expert).
Voici l'état d'exécution du planning de maintenance préventive 2026 de l'agence Bank Al-Maghrib Al Hoceima :

Statistiques globales :
- Taux d'exécution global : ${planningStats?.executionRate || 85}%
- Total interventions planifiées : ${planningStats?.totalPlanned || 0}
- Interventions réalisées : ${planningStats?.completed || 0}
- Interventions en cours : ${planningStats?.inProgress || 0}
- Interventions en retard / non réalisées : ${planningStats?.overdue || 0}
- Interventions avec réserve / anomalies : ${planningStats?.withDefect || 0}

Équipements et anomalies notables :
${JSON.stringify(equipmentSummary || [], null, 2)}

Question / Requête de l'utilisateur :
"${query || "Analyse l'état d'exécution du planning, identifie les risques majeurs et propose un plan d'action prioritaire pour réduire les retards."}"

Consignes de réponse :
1. Sois structuré, professionnel et concis (avec des tirets clairs, gras et recommandations concrètes).
2. Analyse les risques techniques si des équipements majeurs (Transformateur 100kVA, Groupe Électrogène 65kVA, Onduleurs 15kVA, Climatisation locaux serveurs, Pompes de relevage) ont des retards.
3. Propose des priorités hebdomadaires ou mensuelles adaptées au calendrier de maintenance.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("Erreur API Gemini Analyze:", error);
      res.status(500).json({ error: error.message || "Erreur lors de la génération de l'analyse IA." });
    }
  });

  app.post("/api/ai/checklist", async (req, res) => {
    try {
      const { equipmentName, lot, family, frequency } = req.body;
      const ai = getGeminiClient();

      const prompt = `
Génère une checklist technique de contrôle pour la maintenance préventive de l'équipement suivant :
- Nom : ${equipmentName}
- Lot : ${lot}
- Famille : ${family}
- Fréquence : ${frequency} (Hebdomadaire, Mensuel, Trimestriel, Semestriel ou Annuel)

Retourne UNIQUEMENT un objet JSON valide suivant exactement cette structure :
{
  "title": "Gamme de maintenance - ${equipmentName}",
  "estimatedDuration": "45 min",
  "requiredTools": ["Multimètre", "Clé dynamométrique", "EPI..."],
  "safetyPrecautions": ["Consignation électrique", "Gants d'isolation..."],
  "checklistItems": [
    { "id": 1, "task": "Vérification visuelle de l'état général et absence de fuites", "category": "Inspect", "mandatory": true },
    { "id": 2, "task": "Mesure des tensions entre phases", "category": "Measure", "mandatory": true, "expectedValue": "400V +/- 5%" }
  ]
}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      let parsed = {};
      try {
        parsed = JSON.parse(response.text || "{}");
      } catch {
        parsed = { title: `Gamme de maintenance ${equipmentName}`, checklistItems: [] };
      }

      res.json({ checklist: parsed });
    } catch (error: any) {
      console.error("Erreur API Gemini Checklist:", error);
      res.status(500).json({ error: error.message || "Erreur lors de la génération de la checklist." });
    }
  });

  // Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveur démarré sur http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Erreur démarrage serveur:", err);
});
