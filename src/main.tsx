import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import archiveData from "../app/data/archive.generated.json";
import { InstaChannelArchive, type Archive } from "./InstaChannelArchive";
import "./styles.css";
import "./audio.css";
import "./channel.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InstaChannelArchive data={archiveData as Archive} />
  </StrictMode>,
);
