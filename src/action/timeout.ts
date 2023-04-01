import { Client, Colors, CommandInteraction, EmbedBuilder, GuildMember, TextChannel } from 'discord.js'
import ms from 'ms'
import { AsyncDatabase } from '../sqlite/sqlite'
import { ILogger } from '../logger/logger'

export default async (client: Client, interaction: CommandInteraction, logger: ILogger, db: AsyncDatabase): Promise<void> => {
  if (!interaction.isRepliable()) {
    logger.logSync('ERROR', 'Gegebene interaction kann nicht beantwortet werden.')
    return
  }

  const reason = interaction.options.get('reason', true).value?.toString() ?? ''
  var member = interaction.member as GuildMember
  const user = interaction.options.getMember('target') as GuildMember;
  // member = user
  const zeit = ms('15m')

  const embed = new EmbedBuilder()
    .setTitle('User hat einen Timeout bekommen')
    .setDescription(`<@${member.id}> hat einen Timeout bekommen.`)
    .setColor(Colors.Purple)
    .addFields({ name: 'Grund', value: `${member.user.username} hat versucht ${user.user.username} zu timeouten.` })
    .setTimestamp()

  const Oembed = new EmbedBuilder()
    .setTitle('User hat einen Timeout bekommen')
    .setDescription(`<@${user.id}> hat einen Timeout bekommen.`)
    .setColor(Colors.Purple)
    .addFields({ name: 'Grund', value: reason })
    .setTimestamp()

  try {
    let reply = await interaction.reply({ embeds: [Oembed], ephemeral: false, fetchReply: true })
    await sleep(5000);
    await member?.timeout(zeit, `${member.user.username} hat versucht ${user.user.username} zu timeouten.`)
    await reply.edit({ embeds: [embed]})
    try {
      const channel = await interaction.guild?.channels.fetch(process.env.APRIL ?? '') as TextChannel
      await channel?.send(`@${interaction.user.username} hat den Command **timeout** ausgeführt.`)
    } catch (err: any) {
      logger.log("WARN", "APRIL Log doesn't work")
    }
  } catch (err) {
    logger.logSync('ERROR', `Timeout konnte nicht ausgefuehrt werden. ${JSON.stringify(err)}`)
    await interaction.reply({
      embeds: [new EmbedBuilder().setDescription('Timeout fehlgeschlagen')], ephemeral: false
    })
  }
}

function sleep(ms: number) {
  return new Promise<void>((acc, rej) => {
    setTimeout(() => { acc() }, ms)
  });
}
