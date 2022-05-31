FROM ubuntu:xenial

RUN apt-get update \
  && apt-get install -y wget software-properties-common \
  && rm -rf /var/lib/apt/lists/*

WORKDIR "/root"

RUN add-apt-repository -y ppa:ethereum/ethereum

ARG binary
RUN apt-get update \
  && apt-get install -y ethereum

ADD ./kittytestnet.json ./miner/node2/kittytestnet.json
ADD ./password.txt ./miner/node2/password.txt
ADD ./privatekey.txt ./miner/node2/privatekey.txt

RUN exec geth --datadir miner/node2 init miner/node2/kittytestnet.json
RUN exec geth --datadir miner/node2 account import --password miner/node2/password.txt miner/node2/privatekey.txt

ENV address=""
ENV bootnodeId=""
ENV bootnodeIp=""
ENV ipaddress=""

EXPOSE 8546

CMD exec geth --datadir "miner/node2" --syncmode 'full' --port 30312 --http --http.addr "0.0.0.0" --http.corsdomain "*" --http.port 8546 --http.api 'eth,net,web3' --bootnodes "enode://$bootnodeId@$bootnodeIp:0?discport=30310"  --networkid 987 --ipcpath "ethereum2\geth.ipc" --allow-insecure-unlock -unlock f18e24559fed97f4f6fc235ae99d1981cc239d4c --password "miner/node2/password.txt" --mine

EXPOSE 30310
EXPOSE 30311
EXPOSE 30312
EXPOSE 30313