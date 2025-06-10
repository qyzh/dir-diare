'use client';

import Image from 'next/image';

interface PlaylistImage {
  url: string;
  height: number | null;
  width: number | null;
}

interface PlaylistOwner {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  type: string;
  uri: string;
  tracks?: {
    href: string;
    total: number;
  };
}

interface Playlist {
  public: boolean;
  snapshot_id: string;
  id: string;
  name: string;
  description: string;
  images: PlaylistImage[];
  owner: PlaylistOwner;
  tracks: {
    href: string;
    total: number;
  };
  external_urls: {
    spotify: string;
  };
  collaborative: boolean;
  type: string;
  href: string;
  primary_color: string | null;
  uri: string;
}

interface PlaylistResponse {
  items: Playlist[];
  total: number;
}

// Dummy data
const dummyData: PlaylistResponse = {
  "items": [
    {
      "name": "Sampai Ke Ujung Dunia",
      "owner": {
        "external_urls": {
          "spotify": "https://open.spotify.com/user/syauqia48"
        },
        "href": "https://api.spotify.com/v1/users/syauqia48",
        "id": "syauqia48",
        "type": "user",
        "uri": "spotify:user:syauqia48",
        "display_name": "uqi"
      },
      "public": false,
      "snapshot_id": "AAAADldITLcjSDvhkx56MBuT/xxn325m",
      "tracks": {
        "href": "https://api.spotify.com/v1/playlists/2jdlkGnxogT1LwqgutRVKT/tracks",
        "total": 13
      },
      "type": "playlist",
      "uri": "spotify:playlist:2jdlkGnxogT1LwqgutRVKT",
      "primary_color": null,
      "id": "2jdlkGnxogT1LwqgutRVKT",
      "description": "",
      "images": [],
      "external_urls": {
        "spotify": "https://open.spotify.com/playlist/2jdlkGnxogT1LwqgutRVKT"
      },
      "collaborative": false,
      "href": "https://api.spotify.com/v1/playlists/2jdlkGnxogT1LwqgutRVKT"
    },
    {
      "collaborative": false,
      "description": "",
      "external_urls": {
        "spotify": "https://open.spotify.com/playlist/6tXQDB5CEGHcRW9AncTSBo"
      },
      "href": "https://api.spotify.com/v1/playlists/6tXQDB5CEGHcRW9AncTSBo",
      "id": "6tXQDB5CEGHcRW9AncTSBo",
      "images": [
        {
          "url": "https://mosaic.scdn.co/640/ab67616d00001e022605ea6f02168bf5a74c012eab67616d00001e0232ab17f5515e51490841f648ab67616d00001e027cd329ea4a204a8a47caf3d5ab67616d00001e02c800b90e2092a5328f699117",
          "height": 640,
          "width": 640
        },
        {
          "url": "https://mosaic.scdn.co/300/ab67616d00001e022605ea6f02168bf5a74c012eab67616d00001e0232ab17f5515e51490841f648ab67616d00001e027cd329ea4a204a8a47caf3d5ab67616d00001e02c800b90e2092a5328f699117",
          "height": 300,
          "width": 300
        },
        {
          "url": "https://mosaic.scdn.co/60/ab67616d00001e022605ea6f02168bf5a74c012eab67616d00001e0232ab17f5515e51490841f648ab67616d00001e027cd329ea4a204a8a47caf3d5ab67616d00001e02c800b90e2092a5328f699117",
          "height": 60,
          "width": 60
        }
      ],
      "name": "MoRun sunshine",
      "owner": {
        "external_urls": {
          "spotify": "https://open.spotify.com/user/syauqia48"
        },
        "href": "https://api.spotify.com/v1/users/syauqia48",
        "id": "syauqia48",
        "type": "user",
        "uri": "spotify:user:syauqia48",
        "display_name": "uqi"
      },
      "public": true,
      "snapshot_id": "AAAACpGM6hPKn1RZauKVyqLu6JPG9Zyp",
      "tracks": {
        "href": "https://api.spotify.com/v1/playlists/6tXQDB5CEGHcRW9AncTSBo/tracks",
        "total": 9
      },
      "type": "playlist",
      "uri": "spotify:playlist:6tXQDB5CEGHcRW9AncTSBo",
      "primary_color": null
    },
    {
      "collaborative": false,
      "description": "",
      "external_urls": {
        "spotify": "https://open.spotify.com/playlist/1LxcxlonVpzM4HBOHYAwo6"
      },
      "href": "https://api.spotify.com/v1/playlists/1LxcxlonVpzM4HBOHYAwo6",
      "id": "1LxcxlonVpzM4HBOHYAwo6",
      "images": [
        {
          "url": "https://mosaic.scdn.co/640/ab67616d00001e02a977b39b83e50bb412534930ab67616d00001e02b0dd6a5cd1dec96c4119c262ab67616d00001e02f1be86724548aa44130759a6ab67616d00001e02fc342f95f117d48dbdde9735",
          "height": 640,
          "width": 640
        },
        {
          "url": "https://mosaic.scdn.co/300/ab67616d00001e02a977b39b83e50bb412534930ab67616d00001e02b0dd6a5cd1dec96c4119c262ab67616d00001e02f1be86724548aa44130759a6ab67616d00001e02fc342f95f117d48dbdde9735",
          "height": 300,
          "width": 300
        },
        {
          "url": "https://mosaic.scdn.co/60/ab67616d00001e02a977b39b83e50bb412534930ab67616d00001e02b0dd6a5cd1dec96c4119c262ab67616d00001e02f1be86724548aa44130759a6ab67616d00001e02fc342f95f117d48dbdde9735",
          "height": 60,
          "width": 60
        }
      ],
      "name": "lagu ehem",
      "owner": {
        "external_urls": {
          "spotify": "https://open.spotify.com/user/syauqia48"
        },
        "href": "https://api.spotify.com/v1/users/syauqia48",
        "id": "syauqia48",
        "type": "user",
        "uri": "spotify:user:syauqia48",
        "display_name": "uqi"
      },
      "public": true,
      "snapshot_id": "AAAACnvhTOICWjJrw/iRyA6K5iBCNoZ1",
      "tracks": {
        "href": "https://api.spotify.com/v1/playlists/1LxcxlonVpzM4HBOHYAwo6/tracks",
        "total": 8
      },
      "type": "playlist",
      "uri": "spotify:playlist:1LxcxlonVpzM4HBOHYAwo6",
      "primary_color": null
    },
    {
      "collaborative": false,
      "description": "",
      "external_urls": {
        "spotify": "https://open.spotify.com/playlist/13DEDQaMtIuWUCqvOnUmWD"
      },
      "href": "https://api.spotify.com/v1/playlists/13DEDQaMtIuWUCqvOnUmWD",
      "id": "13DEDQaMtIuWUCqvOnUmWD",
      "images": [
        {
          "url": "https://mosaic.scdn.co/640/ab67616d00001e0229fc76441425cb05153f6777ab67616d00001e026190de83b91d63cb62608e02ab67616d00001e028b459d9fb92e029cdfc6d319ab67616d00001e02a19ef82188e2703c4c663188",
          "height": 640,
          "width": 640
        },
        {
          "url": "https://mosaic.scdn.co/300/ab67616d00001e0229fc76441425cb05153f6777ab67616d00001e026190de83b91d63cb62608e02ab67616d00001e028b459d9fb92e029cdfc6d319ab67616d00001e02a19ef82188e2703c4c663188",
          "height": 300,
          "width": 300
        },
        {
          "url": "https://mosaic.scdn.co/60/ab67616d00001e0229fc76441425cb05153f6777ab67616d00001e026190de83b91d63cb62608e02ab67616d00001e028b459d9fb92e029cdfc6d319ab67616d00001e02a19ef82188e2703c4c663188",
          "height": 60,
          "width": 60
        }
      ],
      "name": "AKHIRE LUNGO DRILL",
      "owner": {
        "external_urls": {
          "spotify": "https://open.spotify.com/user/syauqia48"
        },
        "href": "https://api.spotify.com/v1/users/syauqia48",
        "id": "syauqia48",
        "type": "user",
        "uri": "spotify:user:syauqia48",
        "display_name": "uqi"
      },
      "public": true,
      "snapshot_id": "AAAADvxAGZMFZFDEWPIXZtWrNJPxCzHy",
      "tracks": {
        "href": "https://api.spotify.com/v1/playlists/13DEDQaMtIuWUCqvOnUmWD/tracks",
        "total": 13
      },
      "type": "playlist",
      "uri": "spotify:playlist:13DEDQaMtIuWUCqvOnUmWD",
      "primary_color": null
    }
  ],
  "total": 58
};

export default function PlaylistGrid() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {dummyData.items.map((playlist) => (
        <div key={playlist.id} className="flex p-2 gap-1.5 items-center font-mono border border-neutral-700 dark:bg-neutral-950 rounded hover:bg-neutral-900 transition-colors duration-200">
          <div className="w-18 h-18 relative rounded overflow-hidden">
            <Image
              src={playlist.images[0]?.url || '/public/images/bg-noise.png'}
              alt={playlist.name}
              fill
              className="object-cover"
            />
          </div> 
          <div className="">
            <h3 className="font-bold text-white truncate">{playlist.name}</h3>
            <p className="text-neutral-400 text-sm truncate">{playlist.description || 'No description'}</p>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 text-sm">By {playlist.owner.display_name}</span>
              <span className="text-neutral-400 text-sm">{playlist.tracks.total} tracks</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
