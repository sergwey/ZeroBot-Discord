export enum Access {
	SuperUser,
	Owner,
	Administrator,
	Moderator,
	User,
	Restricted // a.k.a. banned
}

export enum Colors {
	Regular = 0x3d7edf,
	Url = 0x00a8fc,
	Success = 0x44e838,
	Warning = 0xe5e838,
	Critical = 0xe83838,
	Question = 0x1a5fc7
}

export enum MusicServices {
	YouTube = "YouTube",
	SoundCloud = "SoundCloud",
	Spotify = "Spotify",
	Yandex = "Yandex",
	VK = "VK",
	Raw = "File",
}

export enum LoopMode {
	Disabled = "disabled",
	Queue = "queue",
	Track = "track"
}