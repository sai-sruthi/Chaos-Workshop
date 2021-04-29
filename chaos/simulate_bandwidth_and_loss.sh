#!/usr/bin/env sh

# Simulates bandwidth restrictions and lossy connection
tc qdisc add dev enp0s8 root netem delay 250ms loss 10% rate 1mbps
