import React from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';

export function ConnectButton() {
    const { connectors, connect } = useConnect();
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    // Prefer Coinbase Wallet, fallback to first available
    const connector = connectors.find((c) => c.name === 'Coinbase Wallet') || connectors[0];

    if (isConnected) {
        return (
            <button className="connect-btn disconnect" onClick={() => disconnect()}>
                Disconnect
            </button>
        );
    }

    return (
        <button className="connect-btn" onClick={() => connect({ connector })}>
            Connect Wallet
        </button>
    );
}
