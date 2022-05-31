FROM ubuntu:xenial

RUN apt-get update \
  && apt-get install -y wget software-properties-common \
  && rm -rf /var/lib/apt/lists/*

WORKDIR "/root"

RUN add-apt-repository -y ppa:ethereum/ethereum

ARG binary
RUN apt-get update \
  && apt-get install -y ethereum

ADD ./kittytestnet.json ./miner/node1/kittytestnet.json
ADD ./password.txt ./miner/node1/password.txt
ADD ./privatekey.txt ./miner/node1/privatekey.txt

RUN exec geth --datadir miner/node1 init miner/node1/kittytestnet.json
RUN exec geth --datadir miner/node1 account import --password miner/node1/password.txt miner/node1/privatekey.txt

ENV address=""
ENV bootnodeId=""
ENV bootnodeIp=""
ENV ipaddress=""

EXPOSE 8545

CMD exec geth --datadir "miner/node1" --syncmode 'full' --port 30311 --http --http.addr "0.0.0.0" --http.corsdomain "*" --http.port 8545 --http.api 'eth,net,web3' --bootnodes "enode://$bootnodeId@$bootnodeIp:0?discport=30310"  --networkid 987 --ipcpath "ethereum1\geth.ipc" --allow-insecure-unlock -unlock 8fc813d81e623f9c80fe218cd770c024e57d7ae7 --password "miner/node1/password.txt" --mine

EXPOSE 30310
EXPOSE 30311
EXPOSE 30312
EXPOSE 30313
