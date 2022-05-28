import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [
    1, 3, 4, 5, 25, 42, 56, 137, 250, 42262, 43113, 43114, 80001,
  ],
});
