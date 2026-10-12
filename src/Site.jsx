import { useState } from 'react'
import {
  Alert, AppBar, Box, Button, Card, CardContent, Chip, Dialog, DialogContent,
  DialogTitle, Drawer, FormControl, IconButton, InputLabel, MenuItem,
  Select, Snackbar, Stack, TextField, Toolbar,
} from '@mui/material'
import {
  ArrowForward, Close, DirectionsWalk, Email, FavoriteBorder, Hiking, Menu,
  People, Place, Schedule, Terrain, WhatsApp,
} from '@mui/icons-material'
import { supabase } from './lib/supabase'
import logoAgencia from '../.Mockups/logo agencia.png'
import hero from '../.Mockups/Expedición Altiplánica Uyuni y Reserva Eduardo Abaroa.png'
import sajamaImage from '../.Mockups/Circuito Cultural y Termal Sajama.png'
import titicacaImage from '../.Mockups/Travesía Sagrada del Lago e Imperio Inca.png'
import luribayImage from '../.Mockups/Ruta de Sabores, Tradición y Viñedos de Luribay.png'
import torotoroImage from '../.Mockups/Expedición Jurásica y Espeleología en Toro Toro.png'

const expeditions = [
  { id: 'salkantay', place: 'Altiplano Sur de Bolivia', name: 'Expedición Altiplánica Uyuni y Reserva Eduardo Abaroa', days: '3 días / 2 noches', price: 'Consultar', difficulty: 'Fácil', altitude: '3,650–4,900 msnm', groupSize: '6 pasajeros por vehículo 4x4', position: 'center 35%', image: hero, description: 'Un viaje en vehículos 4x4 cruzando el desierto de sal más grande del mundo hasta lagunas de colores repletas de flamencos, géiseres activos y paisajes volcánicos.', includes: ['Chofer-guía local', 'Alimentación completa: desayunos, almuerzos y cenas', 'Hospedajes rústicos u hoteles de sal', 'Botiquín de primeros auxilios', 'Transporte privado en vagoneta 4x4'] },
  { id: 'sajama', place: 'Sajama y Curahuara de Carangas', name: 'Circuito Cultural y Termal Sajama', days: '2 días / 1 noche', price: 'Consultar', difficulty: 'Fácil a medio', altitude: '3,900–4,400 msnm', groupSize: '12–15 personas por minivan', position: 'center 50%', image: sajamaImage, description: 'Combinación de arte colonial barroco mestizo en templos históricos con un entorno natural a los pies del pico más alto de Bolivia, rodeado de termas y camélidos.', includes: ['Guía cultural especializado', 'Pensiones completas en el pueblo', 'Hospedaje en albergue comunitario', 'Ingresos al parque y asistencia en emergencias', 'Transporte privado desde La Paz u Oruro'] },
  { id: 'titicaca', place: 'Qhapaq Ñan y Lago Titicaca', name: 'Travesía Sagrada del Lago e Imperio Inca', days: '3 días / 2 noches', price: 'Consultar', difficulty: 'Medio', altitude: '3,812–4,050 msnm', groupSize: 'Máximo 15 personas', position: 'center 60%', image: titicacaImage, description: 'Caminata por senderos empedrados prehispánicos con vistas al lago navegable más alto del mundo, culminando con una navegación hacia los santuarios de la Isla del Sol.', includes: ['Guía bilingüe certificado', 'Comidas tradicionales, incluido Apthapi', 'Hoteles u hostales isleños', 'Lancha a motor compartida o privada', 'Asistencia médica y transporte terrestre ida y vuelta'] },
  { id: 'luribay', place: 'Valle de Luribay', name: 'Ruta de Sabores, Tradición y Viñedos de Luribay', days: '2 días / 1 noche o Full Day', price: 'Consultar', difficulty: 'Fácil', altitude: '2,800 msnm', groupSize: '10–12 personas', position: 'center 45%', image: luribayImage, description: 'Un escape a un valle andino de clima templado para conocer la producción artesanal de vinos y singanis de altura en haciendas coloniales de tradición centenaria.', includes: ['Guía sommelier o local', 'Almuerzos campestres', 'Catas dirigidas de vinos y destilados', 'Estadía en hacienda histórica', 'Transporte privado apto para caminos de valle'] },
  { id: 'torotoro', place: 'Parque Nacional Toro Toro', name: 'Expedición Jurásica y Espeleología en Toro Toro', days: '3 días / 2 noches', price: 'Consultar', difficulty: 'Exigente', altitude: '1,900–2,700 msnm', groupSize: '6 personas por guía local', position: 'center 70%', image: torotoroImage, description: 'Aventura extrema y paleontológica explorando cavernas subterráneas con estalactitas, cañones profundos con cascadas y miles de huellas reales de dinosaurios.', includes: ['Guía certificado del Parque Nacional', 'Alimentación completa y hostal en Toro Toro', 'Cascos y linternas para la cueva', 'Seguro de viaje local', 'Transporte terrestre desde Cochabamba'] },
]

const benefits = [
  ['Turismo Responsable', 'Operación consciente con comunidades y conservación de fuentes de agua.'],
  ['Grupos Reducidos', 'Máximo 8 viajeros para una experiencia íntima y de bajo impacto.'],
  ['Alimentación Orgánica Local', 'Cocina de montaña con ingredientes frescos de origen local.'],
]

function Logo() { return <a href="#inicio" className="inline-flex items-center no-underline"><img src={logoAgencia} alt="Ruta Andina" className="h-11 w-auto object-contain" /></a> }

function SiteHeader() {
  const [open, setOpen] = useState(false)
  const links = [['Inicio', 'inicio'], ['Nosotros', 'nosotros'], ['Experiencias', 'experiencias'], ['Reserva', 'reserva'], ['Contactos', 'contactos']]
  const menu = <Stack spacing={1} className="p-7">{links.map(([label, id]) => <Button key={id} href={`#${id}`} onClick={() => setOpen(false)} className="justify-start !text-ink">{label}</Button>)}</Stack>
  return <AppBar position="fixed" elevation={0} className="!bg-sand/90 !text-ink !backdrop-blur-xl !shadow-[0_1px_10px_rgba(32,27,24,.08)]">
    <Toolbar className="section-shell !min-h-20 !px-0">
      <Logo /><Box className="ml-auto hidden gap-7 md:flex">{links.map(([label, id]) => <a key={id} className="text-xs font-semibold tracking-wide text-ink no-underline hover:text-clay" href={`#${id}`}>{label}</a>)}</Box>
      <IconButton onClick={() => setOpen(true)} className="!ml-auto md:!hidden" aria-label="Abrir menú"><Menu /></IconButton>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>{menu}</Drawer>
    </Toolbar>
  </AppBar>
}

function SectionTitle({ eyebrow, title, copy }) { return <div className="max-w-2xl"><p className="eyebrow mb-2">{eyebrow}</p><h2 className="font-display m-0 text-3xl leading-tight text-ink md:text-4xl">{title}</h2>{copy && <p className="mt-3 text-sm leading-6 text-stone-600 md:text-base">{copy}</p>}</div> }

function Hero() { return <section id="inicio" className="relative flex min-h-[600px] items-end overflow-hidden pt-16 text-white md:min-h-[660px] md:pt-32">
  <img src={hero} alt="Amanecer sobre los Andes peruanos" className="absolute inset-0 h-full w-full object-cover" /><div className="hero-overlay absolute inset-0" />
  <div className="section-shell relative z-10 flex w-full min-w-0 flex-col items-center justify-end pb-6 text-center md:pb-12">
    <h1 className="font-display m-0 w-full max-w-5xl break-normal text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.15] tracking-tight [overflow-wrap:anywhere]">Donde el alma de Bolivia despierta tu camino.</h1>
    <p className="mt-4 w-full max-w-4xl break-normal text-sm leading-6 text-white/85 md:text-base [overflow-wrap:anywhere]">Expediciones auténticas, turismo regenerativo y conexión ancestral a través de los Andes, el Lago Sagrado, valles fértiles y tierras jurásicas. Vive la inmensidad del Altiplano y la riqueza cultural boliviana con el máximo confort consciente.</p>
    <div className="glass mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 rounded-2xl p-5 text-left text-sm text-ink md:grid-cols-3"><Stat icon={<Terrain />} title="+10 años" text="De trayectoria en turismo boliviano" /><Stat icon={<People />} title="Guías especializados" text="Certificados internacionalmente" /><Stat icon={<FavoriteBorder />} title="100% experiencia única" text="Turismo con conciencia" /></div>
  </div>
</section> }

function Stat({ icon, title, text }) { return <div className="flex items-center gap-3"><span className="rounded-full bg-gold/30 p-2 text-clay">{icon}</span><div><b className="block text-xs">{title}</b><span className="text-xs text-stone-600">{text}</span></div></div> }

function About() { return <section id="nosotros" className="bg-[#fffdf9] py-20"><div className="section-shell"><SectionTitle eyebrow="Nuestra esencia" title="Conectando viajeros con el alma andina" copy="Somos un equipo de exploradores, guías y narradores locales comprometidos con ofrecer una mirada transformadora, respetuosa y libre de masificación hacia el corazón de los Andes." />
  <div className="mt-10 grid gap-6 lg:grid-cols-2"><Card elevation={0} className="!rounded-2xl !bg-stone-50"><CardContent className="!p-7"><Chip label="Manifiesto de expedición" className="!mb-4 !bg-gold/25 !text-xs" /><h3 className="font-display m-0 text-2xl">Turismo que honra la Tierra Sagrada</h3><p className="mt-4 text-sm leading-6 text-stone-600">Ruta Andina nació con la convicción de que adentrarse en los glaciares y valles no es un simple desafío atlético, sino un acto de escucha y reverencia. Cada uno de nuestros senderos respeta los ritmos geológicos y culturales de los pueblos que habitan sus orígenes.</p></CardContent></Card>  <div className="space-y-3">{benefits.map(([title, text], index) => <div key={title} className="flex gap-4 rounded-xl bg-stone-50 p-4"><span className="h-fit rounded-full bg-sky/30 p-2 text-clay">{index === 0 ? <FavoriteBorder /> : index === 1 ? <People /> : <Hiking />}</span><div><h3 className="m-0 text-sm font-semibold">{title}</h3><p className="mt-1 text-xs leading-5 text-stone-600">{text}</p></div></div>)}<div className="rounded-xl bg-[#8e5700] p-5 text-sm text-white">“No caminamos sobre la montaña; caminamos con ella, aprendiendo a ser parte del paisaje.”</div></div></div>
</div></section> }

function ExpeditionCard({ route, onSelect }) { return <Card className="group h-full !overflow-hidden !rounded-2xl !border !border-stone-200 !bg-[#fffdf9] !shadow-none transition hover:!-translate-y-1 hover:!shadow-xl"><div className="relative h-52 overflow-hidden"><img src={route.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" style={{ objectPosition: route.position }} /><div className="route-image absolute inset-0" /><Chip label={route.difficulty} size="small" className="absolute right-3 top-3 !bg-clay !text-white" /></div><CardContent className="!p-5"><p className="eyebrow">{route.place}</p><h3 className="font-display mt-2 min-h-14 text-xl leading-tight">{route.name}</h3><div className="mt-4 flex items-center justify-between text-xs text-stone-500"><span><Schedule fontSize="inherit" /> {route.days}</span><span className="font-semibold text-ink">{route.price} <small>USD / pers.</small></span></div><Button onClick={() => onSelect(route)} className="!mt-5 !w-full !rounded-full !border-clay !text-clay" variant="outlined">Ver detalles</Button></CardContent></Card> }

function RouteDialog({ route, onClose, onBook }) { return <Dialog open={Boolean(route)} onClose={onClose} maxWidth="sm" fullWidth>{route && <><DialogTitle className="!pr-12"><p className="eyebrow">Expedición seleccionada</p><span className="font-display text-2xl">{route.name}</span><IconButton onClick={onClose} className="!absolute !right-3 !top-3" aria-label="Cerrar"><Close /></IconButton></DialogTitle><DialogContent dividers><p className="leading-7 text-stone-600">{route.description}</p><div className="my-5 grid grid-cols-2 gap-3"><Info icon={<Schedule />} label="Duración" value={route.days} /><Info icon={<DirectionsWalk />} label="Nivel" value={route.difficulty} /><Info icon={<Terrain />} label="Altitud" value={route.altitude} /><Info icon={<People />} label="Grupo" value={route.groupSize} /></div><h4 className="font-display text-xl">Incluye</h4><ul className="space-y-2 pl-5 text-sm text-stone-600">{route.includes.map(item => <li key={item}>{item}</li>)}</ul><Button onClick={() => onBook(route)} variant="contained" className="!mt-6 !rounded-full !bg-clay !px-6">Elegir esta ruta</Button></DialogContent></>}</Dialog> }

function Info({ icon, label, value }) { return <div className="rounded-xl bg-stone-100 p-3"><span className="text-clay">{icon}</span><p className="m-0 mt-1 text-[.68rem] uppercase tracking-wider text-stone-500">{label}</p><b className="text-xs">{value}</b></div> }

function Experiences({ onBook }) {
  const [selected, setSelected] = useState(null)
  const [difficulty, setDifficulty] = useState('Todos los niveles')
  const filteredExpeditions = difficulty === 'Todos los niveles'
    ? expeditions
    : expeditions.filter(route => route.difficulty === difficulty)

  return <section id="experiencias" className="py-20"><div className="section-shell"><div className="flex flex-wrap items-end justify-between gap-5"><SectionTitle eyebrow="Expediciones destacadas" title="Senderos ancestrales diseñados para transformar" copy="Navega itinerarios creados con equilibrio entre desafío, misticismo andino y servicio de lujo consciente." /><div className="flex flex-col items-end gap-3"><FormControl size="small" className="w-56"><InputLabel id="difficulty-filter-label">Filtrar por nivel</InputLabel><Select labelId="difficulty-filter-label" label="Filtrar por nivel" value={difficulty} onChange={event => setDifficulty(event.target.value)}>{['Todos los niveles', 'Fácil', 'Fácil a medio', 'Medio', 'Exigente'].map(level => <MenuItem key={level} value={level}>{level}</MenuItem>)}</Select></FormControl><Chip icon={<DirectionsWalk />} label={`Explora ${filteredExpeditions.length} ${filteredExpeditions.length === 1 ? 'experiencia' : 'experiencias'}`} variant="outlined" /></div></div><div className="mt-10 grid gap-6 md:grid-cols-3">{filteredExpeditions.map(route => <ExpeditionCard key={route.id} route={route} onSelect={setSelected} />)}</div></div><RouteDialog route={selected} onClose={() => setSelected(null)} onBook={(route) => { setSelected(null); onBook(route) }} /></section>
}

function Booking({ selectedRoute }) {
  const [route, setRoute] = useState(selectedRoute?.id || 'salkantay')
  const [sending, setSending] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const submitReservation = async (event) => {
    event.preventDefault()
    const formElement = event.currentTarget
    setSending(true)
    setFeedback(null)

    try {
      const form = new FormData(formElement)
      const { error } = await supabase.from('expedition_reservations').insert({
        full_name: form.get('full_name'),
        email: form.get('email'),
        phone: form.get('phone'),
        estimated_date: form.get('estimated_date'),
        expedition_id: route,
        requirements: form.get('requirements') || null,
      })
      if (error) throw error

      formElement.reset()
      setRoute('salkantay')
      setFeedback({ severity: 'success', message: '¡Solicitud recibida! Nuestro equipo te contactará pronto.' })
    } catch (error) {
      console.error('Failed to submit expedition reservation:', error)
      setFeedback({ severity: 'error', message: 'No se pudo enviar la solicitud. Inténtalo nuevamente.' })
    } finally {
      setSending(false)
    }
  }

  return <section id="reserva" className="bg-[#fffdf9] py-20"><div className="section-shell max-w-4xl"><Card elevation={0} className="!rounded-2xl !border !border-stone-200"><CardContent className="!p-6 md:!p-10"><SectionTitle eyebrow="Planifica tu ascenso" title="Formulario de Solicitud de Reserva" copy="Completa estos pasos para recibir disponibilidad, recomendaciones y cotización sin ningún compromiso." /><Box component="form" onSubmit={submitReservation} className="mt-7 grid gap-4 md:grid-cols-2"><TextField required name="full_name" label="Nombre completo" placeholder="Ej. Mateo Alvarado" fullWidth /><TextField required name="email" label="Correo electrónico" type="email" placeholder="explorador@ejemplo.com" fullWidth /><TextField required name="phone" label="Celular / WhatsApp" placeholder="+591 675 26036" fullWidth /><TextField required name="estimated_date" label="Fecha estimada" type="date" InputLabelProps={{ shrink: true }} fullWidth /><FormControl fullWidth className="md:col-span-2"><InputLabel id="route-label">Experiencia seleccionada</InputLabel><Select labelId="route-label" label="Experiencia seleccionada" value={route} onChange={(e) => setRoute(e.target.value)}>{expeditions.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}</Select></FormControl><TextField name="requirements" label="Requerimientos alimenticios o salud" multiline rows={3} placeholder="Vegetariano, celíaco, experiencia previa en altura…" fullWidth className="md:col-span-2" /><Button type="submit" disabled={sending} variant="contained" endIcon={<ArrowForward />} className="md:col-span-2 !rounded-full !bg-clay !py-3">{sending ? 'Enviando solicitud…' : 'Confirmar solicitud de reserva'}</Button></Box></CardContent></Card></div><Snackbar open={Boolean(feedback)} autoHideDuration={6000} onClose={() => setFeedback(null)}><Alert severity={feedback?.severity ?? 'success'} variant="filled">{feedback?.message}</Alert></Snackbar></section>
}

function Footer() { return <footer id="contactos" className="bg-stone-100 py-12"><div className="section-shell grid gap-8 text-sm text-stone-600 md:grid-cols-2"><div><Logo /><p className="mt-4 max-w-xs leading-6">Ecoturismo de alta montaña y expediciones conscientes a través de los senderos ancestrales andinos.</p></div><div><p className="eyebrow">Base de operaciones</p><Stack spacing={1.25} className="mt-3"><span><Place className="mr-2 text-clay" fontSize="small" />Av. Perú 1448, villa ingavi</span><span><WhatsApp className="mr-2 text-clay" fontSize="small" />+591 67526036</span><span><Email className="mr-2 text-clay" fontSize="small" />expediciones@rutaandina.eco</span><span><Schedule className="mr-2 text-clay" fontSize="small" />Lunes a sábado · 8:00 AM – 8:00 PM</span></Stack><Chip label="Turismo regenerativo certificado" className="!mt-4 !bg-gold/40 !text-xs" /></div></div><div className="section-shell mt-10 border-t border-stone-300 pt-5 text-xs text-stone-500">© 2026 Ruta Andina Ecotours. Todos los derechos reservados.</div></footer> }

export default function Site() { const [bookingRoute, setBookingRoute] = useState(null); const book = (route) => { setBookingRoute(route); document.querySelector('#reserva')?.scrollIntoView({ behavior: 'smooth' }) }; return <><SiteHeader /><main><Hero /><About /><Experiences onBook={book} /><Booking key={bookingRoute?.id ?? 'default'} selectedRoute={bookingRoute} /></main><Footer /></> }
