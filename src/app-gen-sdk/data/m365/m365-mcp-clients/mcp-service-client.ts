/**
 * MCP service transport layer.
 * Manages the Power Apps data client connection and JSON-RPC dispatch
 * to MCP connector operations.
 */

import { dataSourcesInfo } from '../../../../../.power/appschemas/dataSourcesInfo';
import { getClient } from '@microsoft/power-apps/data';

const DATA_SOURCE_NAME = 'a365mcpservers';

const client = getClient(dataSourcesInfo);

interface QueryRequest {
  jsonrpc?: string;
  id?: string;
  method?: string;
  params?: Record<string, unknown>;
  result?: Record<string, unknown>;
  error?: Record<string, unknown>;
}

export async function invokeMcpServer(
  operationName: string,
  sessionId: string,
  queryRequest: QueryRequest,
): Promise<unknown> {
  const params: { Mcp_Session_Id: string; queryRequest: QueryRequest } = {
    Mcp_Session_Id: sessionId,
    queryRequest,
  };
  return client.executeAsync<{ Mcp_Session_Id: string; queryRequest: QueryRequest }, void>(
    {
      connectorOperation: {
        tableName: DATA_SOURCE_NAME,
        operationName,
        parameters: params,
      },
    },
  );
}
