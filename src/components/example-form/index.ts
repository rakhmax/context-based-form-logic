import { Form, Modal } from "./example-form";
import { CreateLogic } from "./context/create-logic";
import { UpdateLogic } from "./context/update-logic";

export const ExampleForm = Object.assign(Form, { Modal, CreateLogic, UpdateLogic })
