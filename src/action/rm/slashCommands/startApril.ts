import { Client, CommandInteraction, EmbedBuilder, GuildMember, Colors, ChannelType, GuildBasedChannel, NewsChannel } from "discord.js"
import { AsyncDatabase } from '../../../sqlite/sqlite'
import { ILogger } from '../../../logger/logger'
import { config } from 'dotenv'
import { join } from "path"
config()

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
            var iferr = false;
            try {
                await client.user?.setAvatar(join('.', 'src', 'action', 'rm', 'slashCommands', 'glitchy.png'))
                iferr = false;
            } catch (err: any) {
                iferr = true
                console.log(err)
            }
            if (iferr == true) {
                await interaction.reply({content: "Channels erfolgreich umbennant und Avatar nicht geändert", ephemeral: true})
            } else {
                await interaction.reply({content: "Channels erfolgreich umbennant und Avatar geändert", ephemeral: true})
            }
        })
    } catch (err: any) {
        logger.log("ERROR", err)
        await interaction.reply({content: "Ein Fehler ist aufgetreten", ephemeral: true})
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
        "off-topic": "allgemeines-kaffeekränzchen",
        "twitter-feed": "vogel-verlauf",
        "youtube": "duröhre",
        "ankündigungen": "ping-spam",
        "android": ":apple:-android",
        "hack-the-box": "box-the-hack",
        "tryhackme": "donthackme",
        "projekte": "zeitfresser",
        "giveaways": "lotto-2.0",
        "videowünsche": "flo-mach-bessere-videos",
        "mathematik": "fachchinesisch",
        "bildung-karriere": "bildunk-kariere",
        "vorstellungsrunde": "privatsphärenentzug",
        "essen": "foot",
        "hardware": "hardiste",
        "bots": "bist-du-ein-mensch",
        "kryptographie": "kryptotextie",
    }
    if (channelNames[oldname]) {
        return channelNames[oldname];
    } else {
        return oldname
    }
}