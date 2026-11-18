/** The slice of the Home Assistant frontend API the cards use. */

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
}

export interface HassConnection {
  subscribeMessage<T>(cb: (msg: T) => void, msg: Record<string, unknown>): Promise<() => Promise<void>>;
  socket?: WebSocket;
}

export interface Hass {
  states: Record<string, HassEntity>;
  entities?: Record<string, { area_id?: string | null; device_id?: string | null; name?: string | null }>;
  devices?: Record<string, { area_id?: string | null }>;
  areas?: Record<string, { name: string }>;
  config: { unit_system: { temperature: string }; time_zone: string };
  language?: string;
  callService(domain: string, service: string, data?: Record<string, unknown>, target?: Record<string, unknown>): Promise<unknown>;
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  connection: HassConnection;
  hassUrl(path?: string): string;
}

export interface LovelaceCardConfig {
  type: string;
  grid_options?: { columns?: number | "full"; rows?: number | "auto" };
  [key: string]: unknown;
}

export interface GridOptions {
  columns?: number | "full";
  rows?: number | "auto";
  min_columns?: number;
  max_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

export function fireEvent(node: EventTarget, type: string, detail: unknown = {}): void {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}

export const domainOf = (entityId: string): string => entityId.split(".")[0];

/** Area name for an entity (entity area, else its device's area). */
export function areaName(hass: Hass, entityId: string): string | undefined {
  const ent = hass.entities?.[entityId];
  const areaId = ent?.area_id ?? (ent?.device_id ? hass.devices?.[ent.device_id]?.area_id : undefined);
  return areaId ? hass.areas?.[areaId]?.name : undefined;
}

export function friendlyName(hass: Hass, entityId: string): string {
  return (hass.states[entityId]?.attributes.friendly_name as string | undefined) ?? entityId;
}

export const isUnavailable = (s: HassEntity | undefined): boolean => !s || s.state === "unavailable" || s.state === "unknown";

/** Registers a card for the card picker. */
export function registerCard(type: string, name: string, description: string): void {
  const w = window as unknown as { customCards?: unknown[] };
  w.customCards ??= [];
  w.customCards.push({ type, name, description, preview: true });
}
