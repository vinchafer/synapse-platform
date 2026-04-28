# Synapse Platform — Statusbericht
**Stand: 27. April 2026**

---

## Projekt-Übersicht

**Synapse** ist eine Organizational Intelligence SPA — verbindet Mitarbeiter, Projekte und Wissen in einer React-App.

- **Stack**: React 19 + TypeScript 6 · Vite 8 · Tailwind CSS 3 · D3.js 7 · React Router v7 · Recharts · jsPDF · html2canvas
- **Deploy**: Vercel (Auto-Deploy via GitHub) → https://synapse-platform.vercel.app
- **Commits**: 2 (`feat: Synapse V2 - Production Ready` + `fix: vercel config`)
- **Daten**: Rein Mock — kein Backend, keine Datenbank, kein echtes AI-Backend

---

## Feature-Status pro Modul

### ✅ Knowledge Graph (`/`)
Vollständig implementiert.
- D3.js Force-Simulation mit 50 Personen + 20 Projekten + 130 Konzept-Nodes
- Zoom/Pan (Buttons + Maus-Scroll), drag-fähige Nodes
- Abteilungs- & Expertise-Filter
- Shortest-Path-Suche (BFS-Algorithmus, funktioniert korrekt)
- PNG-Export via html2canvas
- Hover-Tooltip + Klick-Panel mit Mitarbeiter-/Projektdetails
- Dark/Light-Theme vollständig umgesetzt

**Offene Punkte:**
- "Ask AI"-Button im Node-Panel navigiert nicht zur AI-Seite
- Graph-Links werden bei jedem Seitenaufruf neu zufällig generiert (nicht deterministisch)

---

### ⚠️ AI Assistant (`/assistant`)
Grundstruktur fertig, aber **kein echtes AI-Backend**.
- Chat-UI mit Typing-Indikator und Scroll-Behavior
- Nur **3 hartcodierte Antworten** (Keyword-Matching auf: `microservices/phoenix`, `european`, `kubernetes`)
- Alle anderen Fragen → Fallback-Text mit 45% Confidence
- Follow-up-Vorschläge keyword-basiert
- PDF-Export der Konversation (jsPDF, funktioniert)
- Copy/Share-Buttons funktionieren
- Chat-Persistenz via localStorage

**Was fehlt:** Echte LLM-Integration (Claude API o.ä.). Alles was nicht keyword-matched bekommt eine generische Antwort.

---

### ⚠️ Executive Dashboard (`/dashboard`)
Grundfunktion vorhanden, aber eingeschränkt.
- 4 KPI-Karten (Retention Score 58%, At Risk 12, Time to Competency 67d, Answer Time 145s)
- Abteilungs-Drill-Down funktioniert (zeigt Anzahl + Durchschnittsscore)
- PDF-Download (sehr basic: nur KPI-Text, keine Charts)
- **Recharts ist installiert aber wird im Dashboard nicht verwendet** — keine Charts gerendert
- **Date-Range-Selector ist reine UI**: ändert keine Daten, kein Effekt auf Anzeige

**Was fehlt:** Charts für KPI-Trends, funktionaler Datums-Filter, historische Daten.

---

### ✅ People Intelligence (`/people`)
Vollständig implementiert.
- Mitarbeiterliste mit Suche + Abteilungs-Filter (50 Employees)
- Knowledge-Profil mit Kreisdiagramm (SVG-basiert)
- Risk-Assessment (High Risk wenn Score > 85)
- Skill-Gap-Analyse (6 definierte Skills vs. tatsächlich vorhandene)
- Connections-Zahl aus Graph-Links
- Knowledge-Transfer-Modal: Pre-filled E-Mail-Text, "Send"-Button kopiert nur in Clipboard

**Offene Punkte:** Send-Button sollte navigieren oder echte E-Mail integrieren.

---

### ✅ Project Archive (`/projects`)
Implementiert — funktioniert als read-only Archiv.
- Projektliste mit Suche + Status-Filter (20 Projekte)
- Detailansicht mit Datum, Owner, Lessons Learned & Decisions (nur Zahlen)
- Outcome-Badges (success/partial/failed)

**Was fehlt:** Tatsächliche Lesson-Texte und Decision-Inhalte fehlen — nur Zahlen vorhanden.

---

### ✅ Knowledge Feed (`/feed`)
Vollständig implementiert — rein simuliert.
- Live-Stream: alle 8 Sekunden neues Event (max. 20 Events im Buffer)
- 4 Event-Typen: atRisk · new · gap · confirmed
- Kategorien-Filter funktioniert
- Vollständig randomisiert aus Mock-Daten

---

### ✅ Command Center (⌘K Overlay)
Vollständig implementiert.
- Volltextsuche über Employees, Projects, Concepts, Sample Responses
- Keyboard-Navigation (↑↓ Enter Escape)
- Recent Searches via localStorage (max. 10)
- **Ergebnis-Klick schließt Overlay, navigiert aber nicht zur Detailseite**

---

### ⚠️ Onboarding (`OnboardingFlow`)
Vollständig implementiert.
- 5-Schritt-Modal mit Progress-Bar
- Konfetti-Animation bei Abschluss
- localStorage-Persistenz (erscheint nur beim ersten Besuch)
- Skip-Option

---

### ❌ Chrome Extension (`/extension`)
**Nur Placeholder** — keine Funktion.
- Statische Beschreibungsseite mit 3 Feature-Cards
- Download-Button ohne Funktion
- Keine Extension-Implementierung existiert

---

## Datenstruktur

| Entität | Menge | Qualität |
|---|---|---|
| Employees (detailliert) | 10 | Vollständige Daten mit Expertise |
| Employees (generiert) | 40 | Generiert via Array.from, zufällige Scores |
| Projects (detailliert) | 8 | Vollständige Metadaten |
| Projects (generiert) | 12 | Zufällige Status/Outcomes |
| Concept-Nodes | 130 | 36 Labels zyklisch wiederholt |
| Graph-Links | ~180 | **Neu-zufällig bei jedem Load** |
| AI-Antworten | 3 | Hartcodiert in mockData.ts |
| KPI-Metriken | 7 | Statische Werte |

---

## Technische Schulden

| Problem | Datei | Priorität |
|---|---|---|
| Graph-Links nicht deterministisch | `mockData.ts:59` | Mittel |
| `any`-Typen in D3-Integration | `KnowledgeGraph.tsx` | Niedrig |
| `eslint-disable` Hooks-Deps | `KnowledgeGraph.tsx:81`, `KnowledgeFeed.tsx:28` | Niedrig |
| Sidebar KPI-Wert hardcoded (58%) | `Sidebar.tsx:42` | Niedrig |
| Command Center navigiert nach Select nicht | `CommandCenter.tsx:43` | Mittel |
| Kein Error Boundary | global | Mittel |
| Kein Testing-Setup | — | Hoch (wenn Prod) |
| Kein State Management (alles lokal) | — | Niedrig bis Mittel |

---

## Was als nächstes Sinn macht

1. **Claude API einbinden** — AI Assistant mit echtem LLM ersetzen
2. **Dashboard-Charts** — Recharts für KPI-Trends nutzen (bereits installiert)
3. **Command Center Navigation** — nach Select zu entsprechender Route routen
4. **Graph-Links** — Seed-basiert machen für deterministische Darstellung
5. **Chrome Extension** — entweder implementieren oder Route entfernen
