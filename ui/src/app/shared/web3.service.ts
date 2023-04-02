import { Injectable } from '@angular/core';
import { ApiService, ApiType } from '../core/api.service';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { Moment } from 'moment';
import * as moment from 'moment';
import { JwtService } from 'src/app/shared/jwt/jwt.service';
import { DateTimeHelper } from 'src/app/shared/dateTime.helper';
import Web3 from 'web3';

export enum Achievement {
  LOGIN_ACHIEVEMENT = 0,
  TRADE_ACHIEVEMENT_1 = 1,
  TRADE_ACHIEVEMENT_2 = 2,
  TRADE_ACHIEVEMENT_3 = 3,
  GAINS_ACHIEVEMENT_1 = 4,
  GAINS_ACHIEVEMENT_2 = 5,
  GAINS_ACHIEVEMENT_3 = 6,
  LOSS_ACHIEVEMENT_1 = 7,
  LOSS_ACHIEVEMENT_2 = 8,
  LOSS_ACHIEVEMENT_3 = 9,
  DEPOSIT_ACHIEVEMENT_1 = 10,
  DEPOSIT_ACHIEVEMENT_2 = 11,
  DEPOSIT_ACHIEVEMENT_3 = 12,
  REFERRAL_ACHIEVEMENT = 13
}


@Injectable()
export class Web3Service {
  private web3;
  private userAccountId;

  private contracts: Array<Contract> = [
    {
      contractAddress: '0xcc8dD6673875055610123Cc357FfdbEA2EcC557e',
      accountId: '0x8a9240d5d014b476624086dE90ad51155f3649D1'
    },
    {
      contractAddress: '0x0D7131c2c3B31BA3186697743BbfF470ba90f8D5',
      accountId: '0x3Add8b7CD0Ea2550680530fF7f63A29B976860ED'
    },
    {
      contractAddress: '0xec800835F39dB8fBb17b44DC2efb9f8B9484fD07',
      accountId: '0x4b7412078F4ec7B0F24Bf49aEA7E9D23266C8987'
    },
    {
      contractAddress: '0x4C0DAa43f4fef786Cd97167e93055d9451eCE9D1',
      accountId: '0x1eeff53FaeDb8AEa884c31fE9cC6C234eD9AC11E'
    },
    {
      contractAddress: '0x7CdE45A7ABD4A882e28D06AEDe9b1cdC36E35D9A',
      accountId: '0x4650C89710A7f5981a195750f501be06880f469E'
    },
    {
      contractAddress: '0x329dfDc8b42D961318f7B7d1C6CeB252375F1eE0',
      accountId: '0x90a77c9492f1Db2a04CD4F03Dbca24403C3997fD'
    }
  ];
  private contractABI = [
    {
      "inputs": [
        {
          "internalType": "enum Achievement",
          "name": "thisAchievement",
          "type": "uint8"
        }
      ],
      "name": "addAchievement",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum Achievement",
          "name": "thisAchievement",
          "type": "uint8"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "int256",
          "name": "newDeposit",
          "type": "int256"
        }
      ],
      "name": "recordNewDeposit",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "recordNewLogin",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newReferralAccountId",
          "type": "address"
        }
      ],
      "name": "recordNewReferral",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "int256",
          "name": "tradeValue",
          "type": "int256"
        },
        {
          "internalType": "bool",
          "name": "toDepositCurrency",
          "type": "bool"
        }
      ],
      "name": "recordNewTrade",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newReferralAccountId",
          "type": "address"
        }
      ],
      "name": "verifyReferral",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "_achievementEnums",
      "outputs": [
        {
          "internalType": "enum Achievement",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum Achievement",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "_achievements",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "_achievementsMinted",
      "outputs": [
        {
          "internalType": "enum Achievement",
          "name": "achievement",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "nftTokenId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_balance",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_deposits",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_logins",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "enum Achievement",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "_nftURIs",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "_referrals",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_tokenIds",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "_trades",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDashboard",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "numLogins",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "numTrades",
              "type": "uint256"
            },
            {
              "internalType": "int256",
              "name": "balance",
              "type": "int256"
            },
            {
              "internalType": "int256",
              "name": "deposits",
              "type": "int256"
            },
            {
              "internalType": "enum Achievement[]",
              "name": "achievementsAvailableToMint",
              "type": "uint8[]"
            },
            {
              "components": [
                {
                  "internalType": "enum Achievement",
                  "name": "achievement",
                  "type": "uint8"
                },
                {
                  "internalType": "uint256",
                  "name": "nftTokenId",
                  "type": "uint256"
                }
              ],
              "internalType": "struct MintedAchievement[]",
              "name": "achievementsIssued",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct Dashboard",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokenName",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokenSymbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  private contractByteCode = ''
  constructor(private api: ApiService,
              private jwtService: JwtService,) { 
    this.userAccountId = this.jwtService.getToken();
    this.setProvider();
  }

  setProvider = async () => {
    const prov = new Web3.providers.HttpProvider('http://localhost:8545');
    if (!this.web3) {
    this.web3 = new Web3(prov);
    } else {
    this.web3.setProvider(prov);
    }
  }

  getAccounts(): Promise<Array<string>>{
    return new this.web3.eth.getAccounts();
  }

  getContract(accountId = null){
    this.userAccountId = this.jwtService.getToken();
    accountId = accountId ? accountId : this.userAccountId;
    let contract = _.findLast(this.contracts, (contract: Contract) => contract.accountId === accountId);
    return new this.web3.eth.Contract(this.contractABI, contract.contractAddress);
  }

  async getDashboard(): Promise<DashboardResponse>{
    const options = { from: this.userAccountId, gas: 10000000 };
    return await this.getContract().methods.getDashboard.call().call()
  }
  async getLoginsCounter() {
    return await this.getContract().methods._logins.call().call();
  }
  async getTradesCounter() {
    return await this.getContract().methods._trades.call().call();
  }
  async getDepositsCounter() {
    return await this.getContract().methods._deposits.call().call();
  }

  async recordNewLogin(walletAddress) {
    const options = { from: walletAddress, gas: 10000000 };
    const response = await this.getContract(walletAddress).methods.recordNewLogin().send(options);
    return response;
  }

  async recordNewReferral(referralAddress) {
    const options = { from: this.userAccountId, gas: 10000000 };
    const response = await this.getContract().methods.recordNewReferral(referralAddress).send(options);
    return response;
  }

  async verifyReferral(walletAddress, referredByAddress) {
    const options = { from: referredByAddress, gas: 10000000 };
    const response = await this.getContract(referredByAddress).methods.verifyReferral(walletAddress).send(options);
    return response;
  }

  async recordNewDeposit(newDeposit) {
    const options = { from: this.userAccountId, gas: 10000000 };
    const response = await this.getContract().methods.recordNewDeposit(newDeposit).send(options);
    return response;
  }
  
  async recordNewTrade(amount, currency) {
    const options = { from: this.userAccountId, gas: 10000000 };
    const response = await this.getContract().methods.recordNewTrade(amount, currency).send(options);
    return response;
  }

  async mint(achievementId) {
    const options = { from: this.userAccountId, gas: 10000000 };
    const response = await this.getContract().methods.mint(achievementId).send(options);
    return response;
  }

  async getTokenURI(tokenId) {
    const options = { from: this.userAccountId, gas: 10000000 };
    const response = await this.getContract().methods.tokenURI(tokenId).call();
    return response;
  }
  
  getAchievementName(achievement){
    achievement = achievement ? _.parseInt(achievement): null;
    switch (achievement) {
      case Achievement.LOGIN_ACHIEVEMENT:        
        return 'Login Achievement';    
      case Achievement.TRADE_ACHIEVEMENT_1:        
        return 'Trade Achievement 1';
      case Achievement.TRADE_ACHIEVEMENT_2:        
        return 'Trade Achievement 2';
      case Achievement.TRADE_ACHIEVEMENT_3:        
        return 'Trade Achievement 3';
      case Achievement.GAINS_ACHIEVEMENT_1:        
        return 'Gains Achievement 1';
      case Achievement.GAINS_ACHIEVEMENT_2:        
        return 'Gains Achievement 2';
      case Achievement.GAINS_ACHIEVEMENT_3:        
        return 'Gains Achievement 3';
      case Achievement.LOSS_ACHIEVEMENT_1:        
        return 'Loss Achievement 1';
      case Achievement.LOSS_ACHIEVEMENT_2:        
        return 'Loss Achievement 2';
      case Achievement.LOSS_ACHIEVEMENT_3:        
        return 'Loss Achievement 3';
      case Achievement.DEPOSIT_ACHIEVEMENT_1:        
        return 'Deposit Achievement 1';
      case Achievement.DEPOSIT_ACHIEVEMENT_2:        
        return 'Deposit Achievement 2';
      case Achievement.DEPOSIT_ACHIEVEMENT_3:        
        return 'Deposit Achievement 3';
      case Achievement.REFERRAL_ACHIEVEMENT:        
        return 'Referral Achievement';
      default:
        return "Unknown Achievement"
    }
  }

  // getEndpoint(param: string): Observable<any> {
  //   return this.api.get(ApiType.Web3Api, `${this.BASE_PATH}/<PATH>?param=${param}`);
  // }

  // postEndpoint(): Observable<boolean> {
  //   return this.api.post(ApiType.Web3Api, `${this.BASE_PATH}/<PATH>`,{});
  // }

}
