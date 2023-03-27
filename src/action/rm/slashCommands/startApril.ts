import { Client, CommandInteraction, EmbedBuilder, GuildMember, Colors, ChannelType, GuildBasedChannel, NewsChannel } from "discord.js"
import { AsyncDatabase } from '../../../sqlite/sqlite'
import { ILogger } from '../../../logger/logger'

export default async function (client: Client, interaction: CommandInteraction, logger: ILogger, db: AsyncDatabase): Promise<void> {
    try {
        interaction.guild?.channels.fetch().then(async channels => {
            channels.forEach(async channel => {
                if (channel) {
                    if (isType(channel) ?? channel.name) {
                        let newname = getNewName(channel.name);
                        await channel.setName(newname.toString())
                    }
                }
            })
            await interaction.reply({content: "Channels erfolgreich umbennant", ephemeral: true})
        })
    } catch (err: any) {
        logger.log("ERROR", err)
        await interaction.reply("Ein Fehler ist aufgetreten")
    }
}

function isType(channel: GuildBasedChannel): boolean {
    switch (channel.type) {
        case ChannelType.GuildText:
            return true;
        case ChannelType.GuildVoice:
            return true;
    }
    return false
}

function getNewName(oldname: string): string {
    const channelNames: { [key: string]: string } = {
        // "old-name": "new-name"
        "quatschen": "trödeltalk"
    }
    if (channelNames[oldname]) {
        return channelNames[oldname];
    } else {
        return oldname
    }
}