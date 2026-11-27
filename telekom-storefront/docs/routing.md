# Routing and page contracts

The home page uses native fragment navigation so links remain usable without JavaScript. Keep anchors and their destination IDs in sync. Treat existing destination IDs as stable because people can bookmark them.

| Intent | Destination |
| --- | --- |
| Check home internet availability | `#verfuegbarkeit`, the postcode checker |
| Explore home internet products | `#internet` |
| Explore mobile products | `#mobilfunk` |
| Explore television products | `#tv` |
| Open help | `#service` or a named help entry |

Availability CTAs in the hero and Internet card should lead to the same checker. Use the German action label the page already uses. Avoid redirecting through JavaScript. In a browser, activate the changed link and verify the URL fragment and visible landing section. Test with Enter as well as a pointer.
