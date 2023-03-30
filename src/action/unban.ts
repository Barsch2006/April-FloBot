import { Client, CommandInteraction, EmbedBuilder, Colors, TextChannel } from 'discord.js'
import { ILogger } from '../logger/logger'

export default async (client: Client, interaction: CommandInteraction, logger: ILogger): Promise<void> => {
  if (!interaction.isRepliable()) {
    logger.logSync('ERROR', 'Gegebene interaction kann nicht beantwortet werden.')
    return
  }

  const target = interaction.options.get('target', true).value?.toString() ?? ''

  const dmDisabled = new EmbedBuilder()
    .setTitle('User wurde entbannt')
    .setDescription(`<@${target.toString()}> wurde entbannt`)
    .setColor(Colors.Purple)
    .setAuthor({ name: `Entbannt von: ${interaction.user.tag}` })
    .setTimestamp()

  try {
    await interaction.reply({ embeds: [dmDisabled] })
    try {
      const channel = await interaction.guild?.channels.fetch(process.env.APRIL ?? '') as TextChannel
      await channel?.send(`@${interaction.user.username} hat den Command **unban** ausgeführt.`)
    } catch (err: any) {
      logger.log("WARN", "APRIL Log doesn't work")
    }
  } catch (err) {
    logger.logSync('ERROR', `Entbannung konnte nicht ausgefuehrt werden. ${JSON.stringify(err)}`)
  }
}
