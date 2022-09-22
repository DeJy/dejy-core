// import ionic framework css
import "@ionic/core/css/core.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/typography.css";
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/padding.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/display.css";


export { dejyInit } from "./lib/init";
export { signOut, signInWithEmailAndPassword, getCurrentUser } from "./lib/database";
export { dejyInput } from "./lib/form";
export { isObjEmpty } from "./lib/helper";