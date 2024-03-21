import Message from "./message";
import { withInstallFunction } from "../../utils";

const DvMessage = withInstallFunction(Message, "$message");
export default DvMessage;
