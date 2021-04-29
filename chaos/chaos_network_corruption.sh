#!/bin/bash

# Corrupts 50% of packets
tc qdisc add dev enp0s8 root netem corrupt 50%
