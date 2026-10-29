import type { Register } from 'claude-code'

// Redline tokens (see the Redline design system)
const RED = '#ff2338'
const RED_SOFT = '#ff5566'
const INK = '#f4f4f5'
const MUTED = '#a1a1aa'

export const register: Register = on => {
  on('session.start', ($, e, next) => {
    $.ui.status('REDLINE // ONLINE')

    return next(e)
  })

  // The person's own prompts: a thin red frame, ink text.
  on('ui.render', { component: 'UserMessage' }, ($, e, next) => {
    const isPrompt = e.props.origin.kind === 'composer' || e.props.origin.kind === 'bridge'

    if (!isPrompt || e.props.isExpanded) {
      return next(e)
    }

    const { Box, Text } = $.ui.resolve(e)

    return (
      <Box borderStyle="single" borderColor={RED} paddingX={1}>
        <Text color={INK}>{e.props.text}</Text>
      </Box>
    )
  })

  // The first block of each reply gets a red label above it; the markdown stays
  // the surface's own so code, tables and links keep working.
  on('ui.render', { component: 'AssistantMessage' }, ($, e, next) => {
    if (!e.props.isFirstOfReply || e.props.isSummary) {
      return next(e)
    }

    const { Box, Text, Markdown } = $.ui.resolve(e)

    return (
      <Box flexDirection="column">
        <Text color={RED} bold>
          {'◢ CLAUDE // REPLY'}
        </Text>
        <Markdown text={e.props.text} />
      </Box>
    )
  })

  // The loading line: uppercase, terminal-style.
  on('ui.render', { component: 'Spinner' }, ($, e, next) =>
    next({
      ...e,
      props: { ...e.props, word: e.props.word.toUpperCase(), suffix: ' //' },
    }),
  )

  // A slim red band above the prompt.
  on('ui.render', { component: 'AbovePrompt' }, ($, e, next) => {
    if (e.props.hasSurvey) {
      return next(e)
    }

    const { Box, Text } = $.ui.resolve(e)

    return (
      <Box>
        <Text color={RED} bold>
          {'▌ REDLINE '}
        </Text>
        <Text color={MUTED}>{'// black glass, one red signal'}</Text>
      </Box>
    )
  })
}
