import { InicioNode } from './nodes/InicioNode';
import { SendMessageNode } from './nodes/SendMessageNode';
import { ActionsNode } from './nodes/ActionsNode';
import { CloseChatNode } from './nodes/CloseChatNode';
import { InactivityNode } from './nodes/InactivityNode';
import { ThankYouNode } from './nodes/ThankYouNode';
import { ServiceEvaluationNode } from './nodes/ServiceEvaluationNode';
import { InteractionsNode } from './nodes/InteractionsNode';

export const customNodeTypes = {
  inicio: InicioNode,
  sendMessage: SendMessageNode,
  actions: ActionsNode,
  closeChat: CloseChatNode,
  inactivity: InactivityNode,
  thankYou: ThankYouNode,
  serviceEvaluation: ServiceEvaluationNode,
  interactions: InteractionsNode,
};

