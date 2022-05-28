FROM ubuntu:xenial

RUN apt-get update \
     && apt-get install -y wget software-properties-common \
     && rm -rf /var/lib/apt/lists/*

WORKDIR "/root"

RUN add-apt-repository -y ppa:ethereum/ethereum

ARG binary
RUN apt-get update \
     && apt-get install -y ethereum

#ENV nodekeyhex=""

ADD ./boot.key ./boot.key

CMD exec bootnode -nodekey boot.key -verbosity 9 -addr :30310

EXPOSE 30310/udp
EXPOSE 30311/udp
EXPOSE 30312/udp
EXPOSE 30313/udp
