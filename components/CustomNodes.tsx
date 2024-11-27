import { InicioNode } from './nodes/InicioNode';
import { SendMessageNode } from './nodes/SendMessageNode';
import { ActionsNode } from './nodes/ActionsNode';
import { CloseChatNode } from './nodes/CloseChatNode';

const nodeTypes = ['inicio', 'sendMessage', 'actions', 'closeChat'];

export const customNodeTypes = {
  inicio: InicioNode,
  sendMessage: SendMessageNode,
  actions: ActionsNode,
  closeChat: CloseChatNode,
};
