import promusicAcademia from "./promusic-academia";
import promusicChat from "./promusic-chat";
import studioFest from "./studio-fest";
import asistenteRag from "./asistente-rag";
import pizzeria from "./pizzeria";
import cuppon from "./cuppon";

const galerias = {
  "promusic-academia": promusicAcademia,
  "promusic-chat": promusicChat,
  "studio-fest": studioFest,
  "asistente-rag": asistenteRag,
  pizzeria,
  cuppon,
};

export function getGaleria(slug, lang = "es") {
  return (galerias[slug] ?? []).map(({ src, alt, caption }) => ({
    src,
    alt: alt[lang] ?? alt.es,
    caption: caption[lang] ?? caption.es,
  }));
}
