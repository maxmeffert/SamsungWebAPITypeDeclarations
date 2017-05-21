/**
 * http://developer.samsung.com/onlinedocs/samsung_webapi_guide_public_2.0/html/wapi_spec/sap.html#full-webidl
 */


type SARole = "PROVIDER" | "CONSUMER";

type TransportType = "TRANSPORT_BLE" | "TRANSPORT_BT" | "TRANSPORT_USB" | "TRANSPORT_WIFI";

type DeviceStatus = "ATTACHED" | "DETACHED";

type PeerAgentStatus = "AVAILABLE" | "UNAVAILABLE";

type AuthenticationType = "AUTHENTICATION_TYPE_NONE" | "AUTHENTICATION_TYPE_CERTIFICATE_X509";

type SAPeerAgentFindErrorCode = "PEER_NOT_FOUND" | "DEVICE_NOT_CONNECTED" | "DUPLICATE_REQUEST";

type SAServiceConnectionErrorCode = "ALREADY_EXIST" | "NETWORK_ERROR" | "DEVICE_UNREACHABLE" | "INVALID_PEERAGENT" | "PEERAGENT_NO_RESPONSE" | "PEERAGENT_REJECTED" | "ERROR_REFLECTION_EXCEPTION";

type SAFileSendErrorCode = "FILE_IO" | "PEER_BUSY" | "PEER_CHANNEL_IO" | "PEER_CONN_LOST" | "PEER_NO_RESPONSE" | "PEER_REJECTED" | "REQUEST_NOT_QUEUED" | "SPACE_NOT_AVAILABLE" | "UNKNOWN_ERROR";

type SAFileReceiveErrorCode = "FILE_IO" | "PEER_CHANNEL_IO" | "PEER_CONN_LOST" | "PEER_NO_RESPONSE" | "PEER_REJECTED" | "SPACE_NOT_AVAILABLE" | "UNKNOWN_ERROR";

type SASocketStatusErrorCode = "PEER_DISCONNECTED" | "DEVICE_DETACHED" | "UNKNOWN_REASON";

type TransferId = number;

type SAChannelId = number;

interface SAManager {
    requestSAAgent(): void;
    setDeviceStatusListener(): void;
}

interface SAAgent {
    readonly id: string;
    readonly name: string;
    readonly role: SARole;
    requestServiceConnection(peerAgent: SAPeerAgent): void;
    setServiceConnectionListener(connectionCallback: ServiceConnectionCallback): void;
    authenticatePeerAgent(peerAgent: SAPeerAgent, successCallback: SAAuthenticatePeerAgentSuccessCallback, errorCallback: ErrorCallback): void;
    acceptServiceConnectionRequest(peerAgent: SAPeerAgent): void;
    rejectServiceConnectionRequest(peerAgent: SAPeerAgent): void;
    findPeerAgents(): void;
    setPeerAgentFindListener(foundCallback: SAPeerAgentFindCallback): void;
    getSAFileTransfer(): SAFileTransfer;
}

interface SAAuthenticationToken {
    readonly authenticationType: AuthenticationType;
    readonly key: string;
}

interface SAPeerAccessory {
    readonly deviceAddress: string;
    readonly deviceName: string;
    readonly productId: string;
    readonly transportType: TransportType;
    readonly vendorId: string;
}

interface SAPeerAgent {
    readonly peerAccessory: SAPeerAccessory;
    readonly appName: string;
    readonly maxAllowedDataSize: number;
    readonly peerId: string;
    readonly profileVersion: string;
}

interface SASocket {
    readonly peerAgent: SAPeerAgent;
    close(): void;
    isConnected(): boolean;
    sendData(channelId: SAChannelId, data: string): void;
    sendSecureData(channelId: SAChannelId, data: string): void;
    setDataReceiveListener(receiveCallback: SADataReceiveCallback): void;
    setSocketStatusListener(statusCallback: SASocketStatusCallback): void;
}

interface SAFileTransfer {
    readonly defaultReceivePath: string;
    sendFile(peerAgent: SAPeerAgent, filePath: string): number;
    setFileSendListener(sendCallback: SAFileSendCallback): void;
    setFileReceiveListener(receiveCallback: SAFileReceiveCallback): void;
    receiveFile(id: TransferId, localPath: string): void;
    cancelFile(id: TransferId): void;
    rejectFile(id: TransferId): void;
}

interface SADataReceiveCallback {
    (channelId: SAChannelId, data: string): void;
    // onreceive(channelId: SAChannelId, data: string): void;
}

interface SASocketStatusCallback {
    (reason: SASocketStatusErrorCode): void;
    // onconnectionlost(reason: SASocketStatusErrorCode): void;
}

interface SAFileReceiveCallback {
    onreceive(id: TransferId, fileName: string): void;
    onprogress(id: TransferId, progress: number): void;
    oncomplete(id: TransferId, localPath: string): void;
    onerror(errorCode: SAFileReceiveErrorCode , id: TransferId): void;
}

interface SAFileSendCallback {
    onprogress(id: TransferId, progress: number): void;
    oncomplete(id: TransferId, localPath: string): void;
    onerror(errorCode: SAFileSendErrorCode, id: TransferId): void;
}

interface SAAgentSuccessCallback {
    (agents: Array<SAAgent>): void;
    // onsuccess(agents: Array<SAAgent>): void;
}

interface SAPeerAgentFindCallback {
    onpeeragentfound(peerAgent: SAPeerAgent): void;
    onpeeragentupdated(peerAgent: SAPeerAgent,  status: PeerAgentStatus): void;
    onerror(errorCode: SAPeerAgentFindErrorCode): void;
}

interface ServiceConnectionCallback {
    onrequest(peerAgent: SAPeerAgent): void;
    onconnect(socket: SASocket): void;
    onerror(errorCode: SAServiceConnectionErrorCode): void;
}

interface SADeviceStatusCallback {
    (type: TransportType, status: DeviceStatus): void;
    // ondevicestatus(type: TransportType, status: DeviceStatus): void;
}

interface SAAuthenticatePeerAgentSuccessCallback {
    (peerAgent: SAPeerAgent,  authToken: SAAuthenticationToken): void;
    // onsuccess(peerAgent: SAPeerAgent,  authToken: SAAuthenticationToken): void;
}
