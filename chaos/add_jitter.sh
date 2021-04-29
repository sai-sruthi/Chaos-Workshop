#!/usr/bin/env sh

# Good for applications that are streaming
tc qdisc add dev enp0s8 root netem delay 50ms 20ms distribution normal
