import AuthorizationGrpcClientFactory from "../AuthorizationGrpcClientFactory";
import { RpcServicePromiseClient } from "../../generated/protos/rpc_grpc_web_pb";
import * as RpcApi from "../../generated/protos/rpc_pb";


const grpcClient = new AuthorizationGrpcClientFactory(RpcServicePromiseClient)

export default {
  client: grpcClient.client,
  api: RpcApi
}
