import {Container} from "inversify";
import { Books } from "../api/Books";

const container = new Container();
container.bind(Books).toSelf();

export default container;
