#!/bin/bash
# Script to reset network issues

tc qdisc delete dev enp0s8 root netem
