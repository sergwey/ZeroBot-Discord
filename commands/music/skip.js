const Messages = require("../../core/Messages");

module.exports = {
	name: "skip",
	aliases: ["s"],
	execute(message, args) {
		const l = Localization.server(message.client, message.guild, this.name);
		const queue = message.client.queue.get(message.guild.id);
		const {channel} = message.member.voice;
		if (!queue) return Messages.warning(message, l.nothing);
		if (!channel) return Messages.warning(message, l.join_warn);
		if (channel != queue.voiceChannel) return Messages.warning(message, l.channel_warn);
		try {
			const old = queue.list[0].title;
			if (queue.loop == "song") queue.list.shift();
			queue.player.stop();
			Messages.success(message, `${l.skipped} \`${old}\`!`);
		} catch (e) {
			Messages.critical(message, `${l.error}\n\`${e}\``);
			message.client.queue.delete(message.guild.id);
			console.error(e);
		}
	}
}