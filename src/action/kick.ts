import { Client, Colors, CommandInteraction, EmbedBuilder, TextChannel } from 'discord.js'
import { AsyncDatabase } from 'src/sqlite/sqlite'
import { ILogger } from '../logger/logger'
import { v4 as uuid } from 'uuid'

export default async (client: Client, interaction: CommandInteraction, logger: ILogger, db: AsyncDatabase): Promise<void> => {
  if (!interaction.isRepliable()) {
    logger.logSync('ERROR', 'Gegebene interaction kann nicht beantwortet werden.')
    return
  }

  const target = interaction.options.get('target', true).value?.toString() ?? ''
  const reason = interaction.options.get('reason', true).value?.toString() ?? ''

  const kickEmbed = new EmbedBuilder()
    .setTitle('User wurde gekickt')
    .setDescription(`<@${target}> wurde erfolgreich gekickt und wurde benachrichtigt.`)
    .setColor(Colors.Purple)
    .setAuthor({ name: `Gekickt von: ${interaction.user.tag}` })
    .setTimestamp()

  const dmDisabled = new EmbedBuilder()
    .setTitle('User wurde gekickt')
    .setDescription(`<@${target}> wurde erfolgreich gekickt. Die Benachrichtigung konnte nicht verschickt werden.`)
    .setColor(Colors.Purple)
    .setAuthor({ name: `Gekickt von: ${interaction.user.tag}` })
    .setTimestamp()
    .addFields({ name: 'Grund', value: reason })

  let dmSucess: boolean

  // send dm
  try {
    const dm = await client.users.fetch(target)
    await dm.send({
      embeds: [
        new EmbedBuilder()
          .setTitle('April April!')
          .setDescription('Bitte sag es niemandem weiter. Du wurdest natürlich nicht gekickt ;)')
          .addFields(
            { name: 'Grund', value: reason }
          )
          .setColor(Colors.Purple)
      ]
    })
    dmSucess = true
  } catch (e) {
    dmSucess = false
  }

  try {
    if (dmSucess) {
      await interaction.reply({ embeds: [kickEmbed], ephemeral: false })
    } else {
      await interaction.reply({ embeds: [dmDisabled], ephemeral: false })
    }
    const channel = await interaction.guild?.channels.fetch('1091006513268662422') as TextChannel
    await channel?.send(`@${interaction.user.username} hat den Command **kick** ausgeführt.`)
  } catch (e) {
    logger.logSync('ERROR', 'Interaction konnte nicht beantwortet werden.')
  }
}
