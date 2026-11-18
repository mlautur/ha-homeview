"""Dev-only speech-to-text fixture for verifying the HomeView voice card.

Accepts 16 kHz mono PCM16 (what browsers send through the Assist pipeline) and
answers with a fixed request once it has received audio, so the binary audio
path can be verified end to end without a real STT engine.
"""
from homeassistant.helpers.discovery import async_load_platform

DOMAIN = "homeview_test_stt"


async def async_setup(hass, config):
    hass.async_create_task(async_load_platform(hass, "stt", DOMAIN, {}, config))
    return True
