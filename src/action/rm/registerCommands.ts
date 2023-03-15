import { PermissionFlagsBits, SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js"

export const registerRMCommands = (): any => {
    return new SlashCommandBuilder()
        .setName('rm')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .setDescription('RealCommands for Mods')
        .addSubcommand(
            new SlashCommandSubcommandBuilder().setName('history')
                .setDescription('Sieht die Historie eines Users ein')
                .addUserOption(
                    opt => opt.setName('target')
                        .setDescription('Die Person, dessen Historie eingesehen werden soll')
                        .setRequired(true)
                ),
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder().setName('clear')
                .setDescription('Leert die Historie eines Users')
                .addUserOption(
                    opt => opt.setName('target')
                        .setDescription('Die Person, dessen Historie geleert werden soll')
                        .setRequired(true)
                ),
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder().setName('warn')
                .setDescription('Verwarnt eine Person')
                .addUserOption(
                    opt => opt.setName('target')
                        .setDescription('Die Person, die verwarnt werden soll')
                        .setRequired(true)
                )
                .addStringOption(
                    opt => opt.setName('reason')
                        .setDescription('Der Grund für den /warn')
                        .setRequired(true)
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder().setName('rename')
                .setDescription('Ändert deinen Benutzernamen in einen random Namen auf dem Server')
                .addUserOption(
                    opt => opt.setName('target')
                        .setDescription('Die Person, dessen Name geändert werden soll')
                        .setRequired(true)
                ),
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder().setName('strike')
                .setDescription('Verwarnt eine Person und erteilt einen Strike.')
                .addUserOption(
                    opt => opt.setName('target')
                        .setDescription('Die Person, die einen Strike bekommen soll')
                        .setRequired(true)
                )
                .addStringOption(
                    opt => opt.setName('reason')
                        .setDescription('Der Grund für den /strike')
                        .setRequired(true)
                ),
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder().setName('kick')
                .setDescription('Kickt eine Person vom Server.')
                .addUserOption(
                    opt => opt.setName('target')
                        .setDescription('Die Person, die gekickt werden soll')
                        .setRequired(true)
                )
                .addStringOption(
                    opt => opt.setName('reason')
                        .setDescription('Der Grund für den kick')
                        .setRequired(true)
                ),
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder().setName('timeout')
                .setDescription('Versetzt eine Person in einem Timeout.')
                .addUserOption(
                    opt => opt.setName('target')
                        .setDescription('Die Person, die einen Timeout erhalten soll')
                        .setRequired(true)
                )
                .addStringOption(
                    opt => opt.setName('zeit')
                        .setDescription('Wie lange soll der Timeout sein?')
                        .setRequired(true)
                )
                .addStringOption(
                    opt => opt.setName('reason')
                        .setDescription('Der Grund für den Timeout')
                        .setRequired(true)
                ),
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder().setName('ban')
                .setDescription('Entfernt eine Person final vom Server')
                .addUserOption(
                    opt => opt.setName('target')
                        .setDescription('Die Person, die gebannt werden soll')
                        .setRequired(true)
                )
                .addStringOption(
                    opt => opt.setName('reason')
                        .setDescription('Der Grund für den /ban')
                        .setRequired(true)
                ),
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder().setName('unban')
                .setDescription('Entfernt eine Person von der Blacklist')
                .addUserOption(
                    opt => opt.setName('target')
                        .setDescription('Die Person, die entbannt werden soll')
                        .setRequired(true)
                ),
        )
}
