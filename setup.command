#!/usr/bin/env bash
# VeilDrop — macOS double-click launcher.
# Opens a Terminal window and runs the step-by-step setup script.
# First run: right-click → Open (or: chmod +x setup.command).

cd "$(dirname "$0")"
echo "======================================================"
echo "  VeilDrop setup (macOS)"
echo "  You will be guided through the whole installation."
echo "======================================================"
echo ""
exec ./scripts/setup.sh