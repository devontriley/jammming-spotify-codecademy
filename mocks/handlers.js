import { rest } from 'msw'

export const handlers = [
    // Handles a GET /me request
    rest.get('https://api.spotify.com/v1/me', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "display_name": "Devon Riley",
                "external_urls": {
                    "spotify": "https://open.spotify.com/user/endercide"
                },
                "followers": {
                    "href": null,
                    "total": 4
                },
                "href": "https://api.spotify.com/v1/users/endercide",
                "id": "endercide",
                "images": [
                    {
                        "height": null,
                        "url": "https://scontent-atl3-2.xx.fbcdn.net/v/t1.18169-1/26238877_10155626944203393_8239711442575932920_n.jpg?stp=dst-jpg_s320x320&_nc_cat=111&ccb=1-7&_nc_sid=0c64ff&_nc_ohc=cfEERAMN5A0AX8bieoR&_nc_ht=scontent-atl3-2.xx&edm=AP4hL3IEAAAA&oh=00_AfAsV2jJmpCyam1M4zwxGOnKfbHKtN_H73Y0gDLTjNrcLw&oe=64A339E7",
                        "width": null
                    }
                ],
                "type": "user",
                "uri": "spotify:user:endercide"
            })
        )
    }),

    // Handles a GET /search request
    rest.get('https://api.spotify.com/v1/search', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    album: 'Nirvana',
                    artist: 'Nirvana',
                    id: '123abc',
                    name: 'Smells Like Teen Spirit',
                    uri: 'testingURI'
                }
            ])
        )
    }),

    // Handles a POST /users/${userID}/playlists request
    rest.post('/playlists', (req, res, ctx) => {
        // If authenticated, return mocked playlist created response
        return res(
            ctx.status(200),
            ctx.json({
                id: 'playlist123',
                name: 'Super cool playlist',
                tracks: {
                    items: [
                        {
                            album: {},
                            artists: [],
                            id: '123abc',
                            name: 'Smells Like Teen Spirit'
                        }
                    ]
                }
            })
        )
    })
]