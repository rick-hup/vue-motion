---
title: Introduction
description: Motion lib.
---

<script setup >
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/lib/registry/default/ui/accordion'
</script>

Motion Vue is a simple  motion library for Vue3  based on Framer Motion.

## FAQ

<Accordion  type="multiple">

<AccordionItem value="faq-1">
<AccordionTrigger>
Why not packaged as a dependency?
</AccordionTrigger>
<AccordionContent>

The idea behind this is to give you ownership and control over the code, allowing you to decide how the components are built and styled.

Start with some sensible defaults, then customize the components to your needs.

One of the drawback of packaging the components in an npm package is that the style is coupled with the implementation. _The design of your components should be separate from their implementation._

</AccordionContent>
</AccordionItem>
<AccordionItem value="faq-2">
<AccordionTrigger>
Which frameworks are supported?
</AccordionTrigger>
<AccordionContent>

This port is built to be used with Vue/Nuxt.

</AccordionContent>
</AccordionItem>
<AccordionItem value="faq-3">
<AccordionTrigger>
Can I use this in my project?
</AccordionTrigger>
<AccordionContent>
Yes. Free to use for personal and commercial projects. No attribution required.

But let us know if you do use it. We'd love to see what you build with it.
</AccordionContent>
</AccordionItem>
</Accordion>
