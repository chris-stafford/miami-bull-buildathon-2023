interface AppConfig {
    cwtToken?: string;
    jwtKey?: string;
    miamibullApiEndpoint?: string;
    web3ApiEndpoint? : string;
}

interface TokenModel {
    accessToken: string;
    refreshToken: string;
    idToken: string;
    scope: string;
    expiresIn: Date | string;
    tokenType: string;
}

interface Token {
    sub: string;
    nickname: string;
    name: string;
    IpAddress: string;
    jti: string;
    iat: string;
    scope: string;
    exp: number,
    iss: string;
    aud: string;
    roles: Array<string>;
}
  
interface DialogInputConfig{
    event: string;
    title?: string;
    text?: string;
    cancelText?: string;
    confirmText?: string;
    isAlertDialog?: boolean;
    inputEnabled?: boolean;
    maxInputLength?: number;
    imageURI?: string;
    options?: Array<string>;
}

interface DialogLogsConfig{
    event: string;
    title?: string;
    text?: string;
    cancelText?: string;
    confirmText?: string;
    podName: string;
    containerName: string;
    logs: Array<string>;
    errors: number;
}

interface DialogResult {
    event: string;
    saved: boolean;
}

interface ErrorResponseBody {
    type: string;
    message: string;
    statusCode: number;
}

interface DashboardResponse {
    achievementsAvailableToMint: Array<any>;
    achievementsIssued: Array<any>;
    balance: string;
    deposits: string;
    numLogins: string;
    numTrades: string;    
}

interface TradeDetails
{
  amount: string;
  toDepositCurrency: boolean;
}

interface AchievementsIssued
{
    achievement: string;
    nftTokenId: boolean;
    tokenURI?: string;
}

interface Contract
{
    contractAddress: string;
    accountId: string;
}