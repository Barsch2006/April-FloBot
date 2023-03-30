import { randomInt } from 'crypto';
import { Client, CommandInteraction, EmbedBuilder, GuildMember, Colors, TextChannel } from "discord.js"
import { AsyncDatabase } from '../sqlite/sqlite'
import { ILogger } from '../logger/logger'

export default async function (client: Client, interaction: CommandInteraction, logger: ILogger, db: AsyncDatabase): Promise<void> {
  const target = interaction.options.getMember('target') as GuildMember

  try {
    const resultban = randomInt(1000);
    const resultkick = randomInt(1000);
    const resultstrike = randomInt(1000);
    const resultwarn = randomInt(1000);
    const gespoints = resultban + resultkick + resultstrike + resultwarn
    const dataEmbed = new EmbedBuilder()
      .setTitle(`${target.displayName}`)
      .setThumbnail(`${target.displayAvatarURL()}`)
      .setDescription(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/restrict-plus-operands
        `Joined: ${target.joinedAt?.getDate()}.${(target.joinedAt?.getMonth() ?? 0) + 1}.${target.joinedAt?.getFullYear()}
        Anzahl Banns: ${resultban}
        Anzahl Kicks: ${resultkick}
        Anzahl Strikes: ${resultstrike}
        Anzahl Warns: ${resultwarn}
        Anzahl Points: ${gespoints}
        `
      )
      .setColor(Colors.Purple)
      .setTimestamp()
    logger.logSync("INFO", `Fake-History from ${target.id}`)
    await interaction.reply({
      embeds: [
        dataEmbed
      ]
    })
    try {
      const channel = await interaction.guild?.channels.fetch(process.env.APRIL ?? '') as TextChannel
      await channel?.send(`@${interaction.user.username} hat den Command **history** ausgeführt.`)
    } catch (err: any) {
      logger.log("WARN", "APRIL Log doesn't work")
    }
  } catch (e) {
    logger.logSync("ERROR", `History could not be entered in `)
    await interaction.reply({
      embeds: [
        new EmbedBuilder().setDescription('Abruf ist fehlgeschlagen.')
      ]
    })
  }
}
