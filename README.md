# Persönliche Portfolio-Webseite – Mario Tadic

High-Tech Entwickler-Portfolio für **Mario Tadic** – Angewandte Elektronik & Technische Informatik (FH Campus Wien).

Orientiert an der Referenzseite [davidfriedl79.github.io/Portfolio](https://davidfriedl79.github.io/Portfolio/) mit eigenständigem Design, dunkler High-Tech-Ästhetik (Cyan & Emerald PCB-Theme), interaktiver Schaltungs-Canvas-Animation, Terminal-Emulator, dynamischer Seismographen-Simulation und 2D-Fahrzeugkorridor-Simulation.

---

## 📁 Projektstruktur

```
portfolio/
├── index.html              # Hauptseite (SPA mit ScrollSpy & Navigation)
├── style.css               # Komplettes Design-System & Responsive CSS Grid/Flex
├── script.js               # Canvas-Simulation, Terminal, Scroll-Reveal, Filter, Kontakt
├── assets/                 # Ordner für Fotos, Schaltpläne & PCB-Renderings
└── projects/
    ├── gaia.html           # Detailseite: Diplomarbeit Gaia (Bodenschallerkennung)
    │                       #   + Interaktiver 3-Achsen-Seismograph (100 Hz Live-Canvas)
    └── auto.html           # Detailseite: Autonom fahrendes Spielzeugauto (C++ / Arduino)
                            #   + Interaktive 2D-Korridor-Fahrsimulation mit IR-Strahlen
```

---

## ⚡ Enthaltene Features & Highlights

1. **Header & Navigation**:
   - Fixed Glassmorphism-Bar mit Backdrop-Blur (`backdrop-filter: blur(16px)`).
   - Brand-Logo: `< MT / > ELECTRONICS`.
   - ScrollSpy mit `IntersectionObserver` zur aktiven Hervorhebung des aktuellen Menüpunkts.
   - Voll animiertes Mobile-Overlay-Menü mit Hamburger-Toggle.

2. **Hero-Bereich**:
   - Interaktiver HTML5-Canvas (`#circuit-canvas`) mit schwebenden Schaltungsknoten, Signalimpulsen und dynamischer Maus-Verbindung.
   - Status-Pill: Pulsierender grüner Punkt mit Studiengangs-Kennzeichnung.
   - Integrierter Terminal-Emulator (`system_status.sh`), der Zeile für Zeile mit Schreibmaschinen-Effekt und blinkendem Cursor bootet.

3. **Über mich**:
   - Qualitativer persönlicher Vorstellungstext.
   - 4 Kernkompetenz-Karten (Elektronikentwicklung, PCB-Design, Embedded Systems, Softwareentwicklung) mit Hover-Glow.

4. **Ausbildung (Timeline)**:
   - Chronologische, vertikale Timeline mit leuchtenden Schaltungs-Knoten und Hervorhebung der technischen Ausbildung (FH Campus Wien, HTL Wien 10).

5. **Berufserfahrung**:
   - Übersichtliche Karten für WIPA, ÖBB-Technische Services GmbH und OBI ohne erfundene Zusatzangaben.

6. **Technische Skills**:
   - Filter-Tabs (Alle, Hardware, Embedded, Software, Weitere) für insgesamt 28 konkrete Kompetenzen ohne erfundene Prozentbalken.
   - Sprachzertifikate (Deutsch C1, Kroatisch C1, Englisch B2) und persönliche Eigenschaften.

7. **Projekte & Detailseiten**:
   - **Projekt 1: Gaia – Bodenschallerkennung (Diplomarbeit)**:
     - Detaillierte Rollenaufteilung (Hardware, KiCad-PCB, Firmware, WebSockets).
     - **Interaktiver Live-Seismograph**: Canvas mit X-, Y- und Z-Wellenform, Rauschgenerator und "Erschütterung simulieren"-Button.
     - Flow-Diagramm der Systemarchitektur und Tabelle aller Hardware-Komponenten.
   - **Projekt 2: Autonomes Spielzeugauto**:
     - Analyse deines GitHub-Repos (`github.com/Veni246/Auto`).
     - Dokumentation der Arduino Uno-Plattform, PlatformIO, Sharp IR-Sensoren (GP2Y0A02YK & GP2Y0A21YK), H-Brücken-Motortreiber, FSM-Architektur (`STOPP`, `FORWARD`, `BACKWARD` mit Hysterese) und der empirischen Excel-Kalibrierungsformel.
     - **Interaktive 2D-Fahrsimulation**: Ein simuliertes 4WD-Fahrzeug mit 3 projizierten IR-Sensorstrahlen navigiert autonom im Korridor um Hindernisse.

8. **Kontakt**:
   - E-Mail `mariotadic246@gmail.com` mit **Ein-Klick-Kopierfunktion**.
   - Standort Wien, Österreich & Direktlink zum GitHub-Profil `github.com/Veni246`.
   - Komfortables Kontaktformular, das bei Klick auf "E-Mail senden" eine vorstrukturierte, vorkodierte E-Mail im Standard-Mailprogramm öffnet.

---

## 🚀 Lokales Öffnen & Testen

Du kannst die Datei `index.html` direkt per Doppelklick in jedem modernen Webbrowser (Chrome, Edge, Firefox, Safari) öffnen. Alle Stile, Schriften und Skripte laden sofort ohne Build-Step oder Node.js.

### Empfohlener Workspace-Pfad:
Die Projektdateien liegen in:
`C:\Users\mario\.gemini\antigravity\scratch\portfolio`

Du kannst diesen Ordner in VS Code öffnen oder als aktiven Workspace in Antigravity festlegen.

---

## 🌐 Veröffentlichung auf GitHub Pages (wie die Referenz)

Um deine Webseite unter `https://veni246.github.io/` oder `https://veni246.github.io/Portfolio/` online zu stellen:

1. Erstelle auf GitHub ein neues Repository namens `Portfolio` (oder `veni246.github.io`).
2. Lade den Inhalt des Ordners `portfolio/` hoch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/Veni246/Portfolio.git
   git push -u origin main
   ```
3. Gehe im GitHub-Repository auf **Settings** &rarr; **Pages** &rarr; Source: **Deploy from a branch** &rarr; Branch: **main** / **root** &rarr; **Save**.
4. Nach ca. 1 Minute ist deine Portfolio-Webseite weltweit erreichbar.
