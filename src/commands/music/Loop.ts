import Command from "../../Command";
import {
	type Message,
	type ChatInputCommandInteraction,
	SlashCommandBuilder,
	GuildMember,
} from "discord.js";
import { Access, LoopMode } from "../../enums";
import { success, warning } from "../../utils/messages";

export default class Loop extends Command {
	name = "loop";
	description = "Changes loop mode";
	aliases = ["repeat"];
	args = ["(track|t|queue|q|off)"];
	access = Access.User;

	data = new SlashCommandBuilder()
		.setName(this.name)
		.setDescription(this.description)
		.addStringOption(option =>
			option
				.setName("mode")
				.setDescription("Loop mode")
				.addChoices(
					{ name: "Track", value: LoopMode.Track },
					{ name: "Queue", value: LoopMode.Queue },
					{ name: "Off", value: LoopMode.Disabled }
				)	
		);

	executeSlash = async (interaction: ChatInputCommandInteraction) => {
		interaction.reply({ embeds: [this.loop(interaction.member as GuildMember, interaction.options.getString("mode") as LoopMode | null)] });
	};

	executePrefix = async (message: Message, args: string[]) => {
		message.reply({
			embeds: [
				this.loop(message.member as GuildMember, (() => {
					switch (args[0]) {
						case "single":
						case "track":
						case "t":
							return LoopMode.Track;
						case "queue":
						case "q":
							return LoopMode.Queue;
						case "off":
							return LoopMode.Disabled;
						default:
							return null;
					}
				})())
			]
		});
	};

	private loop(member: GuildMember, mode: LoopMode | null) {
		const { client: { musicQueue }, guild, voice: { channel } } = member;

		const queue = musicQueue.get(guild.id);

		if (!queue?.playing)
			return warning("Nothing is playing now");
		if (queue.list.length === 0)
			return warning("There is nothing to skip");
		if (!channel)
			return warning("You must be in a voice channel to skip");
		if (channel != queue.voiceChannel)
			return warning("You must be in the same voice channel to skip");
		
		queue.loopMode = mode ?? (m => m === LoopMode.Disabled ? LoopMode.Queue : m === LoopMode.Queue ? LoopMode.Track : LoopMode.Disabled)(queue.loopMode);

		return success("Loop mode changed", `Looping ${queue.loopMode}`);
	}
}
