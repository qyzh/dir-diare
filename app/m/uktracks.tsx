interface Track {
    artists: Array<{
        id: string;
        name: string;
        duration_ms?: number;
        images: Array<{
            url: string;
        }>;
    }>;
}

const dummyTracks = [
    {
        artists: [
            {
                id: "2FDTHlrBguDzQkp7PVj16Q",
                name: "Sprinter",
                duration_ms: 229133,
                images: [
                    {
                        url: "https://i.scdn.co/image/ab6761610000e5eb7fbe33148fe1ae267ddb2956"
                    }
                ]
            },
            {
                id: "3N8Hy6xQnQv1F1XCiyGQqA",
                name: "Sleeping With Sirens",
                images: [
                    {
                        url: "https://i.scdn.co/image/ab6761610000e5eb7fbe33148fe1ae267ddb2956"
                    }
                ]
            },
            {
                id: "3v0QTRruILayLe5VsaYdvk",
                name: "HAARPER",
                images: [
                    {
                        url: "https://i.scdn.co/image/ab6761610000e5eb60663a5ad295d5cecf0ba8b2"
                    }
                ]
            },
            {
                id: "1caBfBEapzw8z2Qz9q0OaQ",
                name: "Asking Alexandria",
                images: [
                    {
                        url: "https://i.scdn.co/image/ab6761610000e5ebd07f0b3d8b5c9576f15f1fb1"
                    }
                ]
            },
            {
                id: "5zn2kC1GFlfjqFpq9ruzCd",
                name: "Paff",
                images: [
                    {
                        url: "https://i.scdn.co/image/ab6761610000e5eb2600954ae90591cef0fa1c03"
                    }
                ]
            },
            {
                id: "46gyXjRIvN1NL1eCB8GBxo",
                name: "All Time Low",
                images: [
                    {
                        url: "https://i.scdn.co/image/ab6761610000e5ebc42923f098c078d2caace1b7"
                    }
                ]
            }
        ]
    }
];

export default function UKtracks() {
    return (
        <section className="mb-4">
            {dummyTracks.map((track, index) => (
                <div key={index} className="flex p-2 gap-1.5 items-center font-mono border border-neutral-700 dark:bg-neutral-950 rounded hover:bg-neutral-900 transition-colors duration-200">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold">{track.artists[0].name}</h3>
                        <p className="text-sm text-neutral-400">{track.artists.map(artist => artist.name).join(', ')}</p>
                    </div>
                    <span className="text-sm text-neutral-500">
                        {track.artists[0].duration_ms ? 
                            `${Math.floor(track.artists[0].duration_ms / 60000)}:${((track.artists[0].duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}` 
                            : '0:00'}
                    </span>
                </div>
            ))}
        </section>
    );
}