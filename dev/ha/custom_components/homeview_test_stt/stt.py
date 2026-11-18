"""Fixture STT provider: returns a fixed transcript after receiving audio bytes."""
from homeassistant.components.stt import (
    AudioBitRates,
    AudioChannels,
    AudioCodecs,
    AudioFormats,
    AudioSampleRates,
    SpeechResult,
    SpeechResultState,
)
from homeassistant.components.stt.legacy import Provider

TRANSCRIPT = "turn on the kitchen lights"


async def async_get_engine(hass, config, discovery_info=None):
    return HomeViewTestSTT()


class HomeViewTestSTT(Provider):
    name = "HomeView test STT"

    @property
    def supported_languages(self):
        return ["en"]

    @property
    def supported_formats(self):
        return [AudioFormats.WAV]

    @property
    def supported_codecs(self):
        return [AudioCodecs.PCM]

    @property
    def supported_bit_rates(self):
        return [AudioBitRates.BITRATE_16]

    @property
    def supported_sample_rates(self):
        return [AudioSampleRates.SAMPLERATE_16000]

    @property
    def supported_channels(self):
        return [AudioChannels.CHANNEL_MONO]

    async def async_process_audio_stream(self, metadata, stream):
        received = 0
        async for chunk in stream:
            received += len(chunk)
        self.hass.states.async_set("sensor.homeview_test_stt_bytes", received)
        if not received:
            return SpeechResult(None, SpeechResultState.ERROR)
        return SpeechResult(TRANSCRIPT, SpeechResultState.SUCCESS)
