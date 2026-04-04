# Editör Agent Çalıştırma Komutu

Claude Code'da şu komutu çalıştır:

```
agents/EDITOR_AGENT.md dosyasını oku ve editör agentı olarak çalış. 

Görevlerin:
1. Web'den güncel kahve piyasa haberlerini tara
2. Arabica ve Robusta fiyat durumunu analiz et
3. Günlük editör notu yaz
4. Piyasa duyarlılığını belirle (Yükseliş/Düşüş/Nötr + yüzde)
5. Günün öne çıkan haberini belirle

Sonuçları Supabase'e yaz:
- API: POST https://worldcoffee24.com/api/agent
- Header: x-agent-key: [AGENT_API_KEY]
- Actions: update_content, add_to_queue, log

Her işlem sonunda agent_logs'a log yaz.
```
