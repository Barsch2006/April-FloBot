import { Client, CommandInteraction, EmbedBuilder, GuildMember, Colors, ChannelType, GuildBasedChannel, NewsChannel } from "discord.js"
import { AsyncDatabase } from '../../../sqlite/sqlite'
import { ILogger } from '../../../logger/logger'
import { join } from "path"

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
                await client.user?.setAvatar(join('.', 'src', 'action', 'rm', 'slashCommands', 'flobot.png'))
                iferr = false;
            } catch (err: any) {
                iferr = true
            }
            if (iferr == true) {
                await interaction.reply({content: "Channels erfolgreich umbennant und Avatar nicht geändert", ephemeral: true})
            } else {
                await interaction.reply({content: "Channels erfolgreich umbennant und Avatar geändert", ephemeral: true})
            }
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
        // "new-name": "oldname-name"
        "allgemeines-kaffeekränzchen": "off-topic",
        "vogel-verlauf": "twitter-feed",
        "duröhre": "youtube",
        "ping-spam": "ankündigungen",
        ":apple:-android": "android",
        "box-the-hack": "hack-the-box",
        "donthackme": "tryhackme",
        "zeitfresser": "projekte",
        "lotto-2.0": "giveaways",
        "flo-mach-bessere-videos": "videowünsche",
        "fachchinesisch": "mathematik",
        "bildunk-kariere": "bildung-karriere",
        "privatsphärenentzug": "vorstellungsrunde",
        "foot": "essen",
        "hardiste": "hardware",
        "bist-du-ein-mensch": "bots",
        "kryptotextie": "kryptographie"
    }
    if (channelNames[oldname]) {
        return channelNames[oldname];
    } else {
        return oldname
    }
}