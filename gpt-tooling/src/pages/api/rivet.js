import {
  currentDebuggerState,
  loadProjectFromFile,
  runGraph
} from '@ironclad/rivet-node'

export async function runRivetGraph(graphId, inputs) {
  const project = currentDebuggerState.uploadedProject ?? await loadProjectFromFile('./BasicRivetExample.rivet-project')

  const outputs = await runGraph(project, {
    graph: graphId,
    openAiKey: process.env.OPEN_AI_API_KEY,
    inputs,
    remoteDebugger: rivetDebuggerServerState.server ?? undefined,
    externalFunctions: {
      calculate: async (_context, calculationStr) => {
        if (typeof calculationStr !== 'string') {
          throw Error('expected a string input')
        }
        const value = calculateExpression(calculationStr)
        if (value) {
          return {
            type: 'number',
            value,
          };
        } else {
          return {
            type: 'string',
            value: 'Error calculating',
          };
        }
      },
    },
  })

  return outputs
}

export async function runMessageGraph(graphId, inputs) {
  const outputs = await runRivetGraph(graphId, {
    messages: {
      type: 'object[]',
      value: inputs,
    },
  });

  return coerceType(outputs.output, 'string');
}

export default async function POST(req) {
  const { inputs } = req.body
  const response = await runMessageGraph('2-s5XWxt_SdQePeVbboCC', inputs);
  return response
}