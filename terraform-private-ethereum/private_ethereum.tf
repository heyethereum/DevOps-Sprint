/*
    This is a usage example of the "SCB-TechX-Saber-Labs/ecs-private-ethereum-blockchain/aws" module version "0.1.0".
    The arguments and outputs might be different in the future versions.
*/

# Call the module and set the local name as "private_ethereum" to refer to this instance of the module later.
module "private_ethereum" {
    
    # Required argument 
    # To tell terraform where to download the module's source code when running "terraform init".
    # In this example, the source is terraform's public registry.
    source                  = "SCB-TechX-Saber-Labs/ecs-private-ethereum-blockchain/aws"
    
    # Optional argument
    # To specify the version of the module, otherwise it uses the latest version.
    version                 = "0.1.0"
  
    # Required argument
    # To distinguish this provisioning from others as this is used to name the created AWS components.
    network_name            = "devel"

    # Optional argument
    # How many Ethereum nodes to run in the blockchain network, the default is 2 if not specified.
    number_of_nodes         = 2
    
    # Required argument
    # Specify the AWS region for the provisioned infrastructure.
    region                  = "ap-southeast-1"

    # Required argument
    # The AWS VPC ID for the provisioned infrastructure.
    vpc_id                  = "vpc-034c069f93d746d3a"
  
    # Required argument
    # The list of AWS subnet to place the Ethereum nodes inside.
    subnet_ids              = [
        "subnet-06f45a0fc6b71b603",
        "subnet-01800971c4347c305",
        "subnet-0b06c8d07e3fafa4f"
    ]

    # Required argument
    # Whether the specified subnets are public subnets or private subnets.
    is_public_subnets       = false

    # Optional argument
    # Specify the mapping of Ethereum address and the amount of ETH for initial allocations.
    # It is convenient to have balance in accounts for testing purpose.
    # The addess with public key and private key can be generated from https://iancoleman.io/bip39/
    # Write down the private key as it is required to access the balance in the account.
    initial_eth_allocations = {
        "0xCe9F3bdF8382475073a326DdFF8C177BA00756Ab": "10",
        "0x7355cF2D978205Ea215576D34CdAA4F381FB6464": "5",
    }
    
    # The following are optional arguments for port numbers to exposing services.
    # No need to specify, if there is no change required.
    go_ethereum_p2p_port       = 21000
    go_ethereum_rpc_port       = 22000
    ethstats_port              = 3000
    ethereum_explorer_port     = 80

    # The following are optional arguments for the docker images used to run services' container in the module.
    # The default values are the images from docker hub.
    # You might need to modify them to use your own image registry, in case of the docker hub rate limit is reached.
    go_ethereum_docker_image             = "ethereum/client-go:alltools-v1.10.8"
    aws_cli_docker_image                 = "amazon/aws-cli"
    ethstats_docker_image                = "puppeth/ethstats:latest"
    ethereum_lite_explorer_docker_image  = "alethio/ethereum-lite-explorer:v1.0.0-beta.10"
}
  
# The Ethereum "chain ID" of the provisioned blockchain network.
output "chain_id" {
     value = module.private_ethereum.chain_id
}

# The ECS cluster name created for running the services' container.
output "ecs_cluster_name" {
     value = module.private_ethereum.ecs_cluster_name
}

# The DNS of Network Load Balancer for exposing the services.
output "nlb_dns" {
     value = module.private_ethereum.nlb_dns
}

# The HTTP endpoint to access the Ethereum block explorer.
output "ethereum_explorer_endpoint" {
     value = module.private_ethereum.ethereum_explorer_endpoint
}

# The HTTP endpoint to access the Ethereum Network Statistics dashboard.
output "ethstats_endpoint" {
     value = module.private_ethereum.ethstats_endpoint
}

# The HTTP endpoint for Go Ethereum's RPC APIs.
output "geth_rpc_endpoint" {
     value = module.private_ethereum.geth_rpc_endpoint
}
    
# The overall status output from the module.
output "status" {
    value = module.private_ethereum._status
}