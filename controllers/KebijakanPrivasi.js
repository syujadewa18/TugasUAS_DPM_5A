import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
	StyleSheet, 
	Text, 
	ScrollView, 
	View, 
	TextInput, 
	Button, 
    TouchableOpacity, 
    TouchableNativeFeedback, 
	FlatList,
	Platform,
	ImageBackground,
    Image,
    AsyncStorage,
    Alert,
    SafeAreaView
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as mAuth from '../models/action/mAuth';
import Spinner from 'react-native-loading-spinner-overlay';
// import { RadioButton } from 'react-native-paper';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const landingPageData = {
    image: require('../assets/creekgarden/creekpoin/background.png'),
    tips: require('../assets/creekgarden/creekpoin/tips.png'),
    text: 'YUK IKUT PARTISIPASI DALAM MENYAMBUT\nHARI KEMERDEKAAN INDONESIA YANG KE-76',
    btn1: 'PROMO BUAH CREEK GARDEN\nDiskon sampai 50 % Lho',
    btn2: 'SAYURAN SEGAR\nGratis Ongkos Kirim',
    btn1Href: '',
    btn2Href: '',
}

const LandingPage = props => {
    function arrayColumn(array, columnName) {
        return array.map(function(value,index) {
            return value[columnName];
        })
    }

    // const dispatch = useDispatch();
    // const [selectedVoucher, setSelectedVoucher] = useState(0);
    // const [isLoading, setIsLoading] = useState(false);
    // let userLogin = useSelector(state => state.auth.user);
    // let voucherData = []
    // let voucherDataArr = [];
    // let selectedVoucherArr = [];
    // useEffect(() => {
    //     const loadVoucher = async () => {
    //         setIsLoading(true);
    //         await dispatch(mAuth.voucherGet(userLogin.id));
    //         setIsLoading(false);
    //     };
    //     loadVoucher();
    // }, []); 
    // let svoucherData = useSelector(state => state.auth.voucher);
    // if (svoucherData) {
    //     voucherData = svoucherData
    // }
    // let sSelectedVoucher = useSelector(state => state.auth.selectedvoucher);
    // if (sSelectedVoucher) {
    //     selectedVoucherArr = sSelectedVoucher
    // }

    // if (isLoading) {
    //     return (
    //         <Spinner
    //             visible={isLoading}
    //             textStyle={{ color: '#FFFFFF' }}
    //         />
    //     );
    // }
    
    return (
        <ScrollView>
            <View style={{ backgroundColor: '#fff', marginTop: 0, paddingVertical: 20, paddingHorizontal: 30 }}>
                <Text style={{ fontFamily: 'poppins-regular' }}>
<Text style={{color: '#6BB745', fontSize: 18, fontFamily: 'poppins-semi-bold'}}>Syarat dan Ketentuan Penggunaan</Text>{"\n"}{"\n"}
Mohon untuk membaca Syarat dan Ketentuan Penggunaan yang tertulis di bawah ini dengan seksama sebelum mengakses situs www.creekgarden.co.id dan/atau aplikasi Creekgarden (“Platform”) dan/atau menggunakan layanan dari Creekgarden. Bahwa dengan menggunakan platform Kami, Anda menyatakan telah membaca, memahami dengan seksama, dan menyetujui untuk terikat dengan Syarat dan Ketentuan Penggunaan ini (“Syarat dan Ketentuan”), serta menjamin bahwa Anda adalah individu yang secara hukum berhak untuk mengadakan perjanjian yang mengikat berdasarkan hukum Negara Republik Indonesia dan bahwa Anda telah berusia minimal 21 tahun atau sudah menikah dan/atau tidak berada di bawah perwalian. Atau apabila Anda berusia di bawah 21 tahun, Anda telah mendapatkan izin dari orang tua atau wali Anda. Dengan begitu, Syarat dan Ketentuan ini merupakan suatu perjanjian yang sah antara Anda dan CV GREEN AND BLUE dan afiliasinya.{"\n"}
Dengan tetap mengakses Platform dan/atau menggunakan layanan Creekgarden, Anda telah setuju untuk terikat pada Syarat dan Ketentuan ini:{"\n"}{"\n"}

<Text style={{color: '#6BB745', fontSize: 18, fontFamily: 'poppins-semi-bold'}}>Pendahuluan</Text>{"\n"}{"\n"}
CV GREEN AND BLUE dan afiliasinya, yang selanjutnya akan disebut sebagai Creekgarden atau “Kami” atau “Kita” adalah perseroan terbatas yang didirikan berdasarkan hukum Indonesia, yang berdomisili di Jakarta Selatan, yang merupakan penyedia dan operator dari Platform Kami. Creekgarden menyediakan Platform ini dengan tujuan untuk mengembangkan dan mengoperasikan sebuah online marketplace yang menyediakan layanan berupa pembelian dan pengiriman produk-produk agrikultur dan produk lainnya yang disediakan oleh produsen-produsen terpilih Creekgarden (“Layanan”).{"\n"}{"\n"}

<Text style={{color: '#6BB745', fontSize: 18, fontFamily: 'poppins-semi-bold'}}>Pembuatan dan Penggunaan Akun</Text>{"\n"}{"\n"}
1. Sebelum melakukan pemesanan dalam Platform, Anda wajib mendaftarkan diri dengan memasukkan informasi pribadi Anda yang diminta termasuk, namun tidak terbatas pada alamat email dan kode sandi.{"\n"}{"\n"}
2. Setiap alamat email hanya dapat digunakan untuk membuat satu akun.{"\n"}{"\n"}
3. Dengan memasukkan informasi pribadi tersebut, Anda menjamin bahwa seluruh informasi tersebut benar dan lengkap, serta wajibmengirimkan permintaan mengubah informasi kepada Kami apabila terdapat perubahan dari informasi yang telah Anda berikan.{"\n"}{"\n"}
4. Apabila Anda mendaftarkan atas nama suatu badan hukum atau badan usaha lainnya, Anda menyatakan dan menjamin bahwa Anda berwenang untuk bertindak untuk dan atas nama badan hukum atau badan usaha tersebut, serta mengikat.{"\n"}{"\n"}
5. Hanya Anda yang dapat menggunakan akun Anda sendiri dan Anda berjanji untuk tidak memberikan wewenang kepada orang lain untuk menggunakan identitas Anda atau menggunakan akun Anda. Anda tidak dapat menyerahkan atau mengalihkan akun Anda kepada pihak lain.{"\n"}{"\n"}
6. Kami tidak bertanggung jawab atas seluruh resiko dan kerugian yang timbul sebagai akibat dari penyalahgunaan akun Anda oleh pihak lain yang disebabkan oleh penyerahan dan pengalihan informasi akun Anda kepada pihak lain, termasuk namun tidak terbatas pada meminjamkan atau memberikan akses akun Anda kepada pihak lain, mengakses link atau tautan yang diberikan oleh pihak lain, memberikan atau memperlihatkan kode verifikasi (One Time Password), kode sandi dan/atau email kepada pihak lain.{"\n"}{"\n"}
7. Anda berjanji hanya akan menggunakan Platform untuk tujuan yang dimaksud untuk mendapatkan Layanan yang tersedia. Anda tidak boleh menyalahgunakan atau menggunakan Platform untuk melakukan penipuan atau menyebabkan ketidaknyamanan terhadap orang lain atau melakukan pemesanan palsu.{"\n"}{"\n"}

<Text style={{color: '#6BB745', fontSize: 18, fontFamily: 'poppins-semi-bold'}}>Informasi dan Keamanan Platform</Text>{"\n"}{"\n"}
1. Kami melakukan manajemen informasi dan keamanan Platform dengan berusaha menjaga seluruh Layanan, mulai dari pemesanan sampai pembayaran dalam Platform seaman mungkin dan terbebas dari gangguan dari pihak-pihak yang tidak bertanggung jawab.{"\n"}{"\n"}
2. Terlepas dari usaha maksimal yang diberikan, Kami tidak dapat menjamin bahwa pada Platform akan selalu bebas dari kesalahan dan penggunaannya selalu sesuai dengan tujuan, tepat waktu dan setiap kesalahan akan dikoreksi, bebas dari virus atau bug atau menunjukkan keseluruhan fungsi, akurasi, keandalan Platform tersebut.{"\n"}{"\n"}
3. Kami tidak bertanggung jawab untuk setiap keterlambatan, kegagalan, kesalahan, atau kerugian saat pemakaian Layanan kami yang ditimbulkan karena penggunaan internet dan komunikasi elektronik yang tidak kompatibel, atau hal-hal lain yang merusak yang dikirimkan ke sistem komputer milik Anda melalui Platform Kami.{"\n"}{"\n"}
4. Kami tidak akan bertanggung jawab atas segala kerugian yang disebabkan oleh pihak-pihak lain yang mengakses akun Anda tanpa izin dan kewenangan dari Anda, serta hal-hal yang bukan terjadi karena kesalahan/kelalaian dari Kami.{"\n"}{"\n"}
5. Kami mengumpulkan dan memproses informasi pribadi Anda, seperti nama, alamat surat elektronik, dan nomor telepon seluler Anda ketika Anda mendaftar di Platform dan juga Layanan yang tersedia di dalamnya. Anda harus memberikan informasi yang akurat dan lengkap, memperbaharui informasi dan setuju untuk memberikan bukti identitas apapun yang secara wajar diminta oleh Kami.{"\n"}{"\n"}
6. Anda mengerti bahwa ketika menggunakan Platform dan seluruh Layanan Kami, data pribadi Anda dapat dikumpulkan, digunakan dan/atau diungkapkan oleh Kami sehingga Anda dapat menikmati Platform dan Layanan Kami. Hanya untuk tujuan operasi Platform dan penggunaan layanan dan/atau tujuan lain yang dianggap pantas, Anda dengan ini memberikan persetujuan kepada Kami untuk mengumpulkan, menggunakan, atau mengungkapkan setiap dan seluruh data pribadi Anda yang Anda mengerti bahwa bagian dari data atau informasi mengenai Anda dapat diakses oleh pihak ketiga manapun yang bekerja sama dengan Kami. Untuk menghindari keraguan, Anda juga mengizinkan Kami untuk mengungkapkan data pribadi Anda kepada setiap otoritas (termasuk otoritas hukum) berdasarkan hukum dan peraturan perundang-undangan yang berlaku. Kami tidak bertanggung jawab atas setiap kerugian Anda akibat penyalahgunaan oleh pihak ketiga atas data atau informasi Anda yang telah diungkapkan berdasarkan ketentuan ini. Anda memahami bahwa Kami dapat disyaratkan untuk mengungkapkan data pribadi Anda kepada setiap otoritas (termasuk otoritas hukum atau moneter) berdasarkan hukum dan peraturan perundang-undangan yang berlaku. Kami akan memiliki hak untuk menginvestigasi dan menuntut dalam hal terjadi pelanggaran terhadap seluruh ketentuan di atas, sepanjang yang dimungkinkan oleh hukum termasuk melibatkan aparat penegak hukum. Kami memiliki hak untuk memonitor akses Anda dalam Platform, untuk memastikan kepatuhan dengan Ketentuan Penggunaan ini, atau untuk mematuhi peraturan yang berlaku.{"\n"}{"\n"}

<Text style={{color: '#6BB745', fontSize: 18, fontFamily: 'poppins-semi-bold'}}>Pemesanan</Text>{"\n"}{"\n"}
1. Anda menjamin bahwa setiap informasi dan/atau identitas yang Anda berikan kepada Kami sehubungan dengan pemesanan merupakan informasi yang benar dan lengkap dan Kami tidak bertanggung jawab atas kesalahan pesanan dalam hal terdapat kesalahan identitas.{"\n"}{"\n"}
2. Saat melakukan pemesanan, Anda harus memilih dan/atau memberikan informasi yang akurat dan lengkap mengenai jenis, spesifikasi, kuantitas dan/atau setiap karakteristik khusus dari produk yang dipesan. Kami tidak akan bertanggung jawab atas kerugian yang disebabkan oleh kesalahan pemesanan Anda.{"\n"}{"\n"}
3. Kami berhak untuk menolak pesanan Anda jika, menurut penilaian Kami, Creekgarden tidak dapat melakukan pengiriman produk termasuk tidak terbatas karena produk tidak tersedia, atau bahwa berdasarkan keterangan Platform dan Layanan Kami, lokasi pengiriman pesanan Anda di luar jangkauan pengiriman kami, atau dengan menerima pesanan dari Anda, Anda akan melanggar Syarat dan Ketentuan ini atau hukum dan peraturan perundang-undangan yang berlaku.{"\n"}{"\n"}

<Text style={{color: '#6BB745', fontSize: 18, fontFamily: 'poppins-semi-bold'}}>Harga dan Pembayaran</Text>{"\n"}{"\n"}
1. Seluruh harga produk yang terdapat dalam Platform Kami adalah benar saat dipublikasikan. Namun, harga produk yang ditampilkan dalam Platform dapat berubah dari waktu ke waktu tergantung situasi dan kondisi bisnis. Sebagai penyedia Platform, Kami akan mengubah harga yang terdaftar disesuaikan dengan perubahan harga yang dilakukan oleh produsen-produsen Kami. {"\n"}{"\n"}
2. Anda hanya berkewajiban untuk membayar sesuai dengan jumlah pesanan Anda dan ongkos kirim apabila ada sesuai yang tercantum pada saat proses checkout. Anda juga dapat menggunakan promo atau voucher yang tersedia untuk mendapatkan potongan harga atau keuntungan lainnya. Perubahan terhadap harga pesanan Anda tidak dapat terjadi pada saat Anda dalam proses checkout dari Platform Kami. {"\n"}{"\n"}
3. Anda hanya dapat melakukan pembayaran atas pesanan Anda melalui metode-metode pembayaran yang telah disediakan dalam Platform Kami (dari waktu ke waktu dapat berubah){"\n"}{"\n"}
4. Anda menjamin untuk menyediakan informasi mengenai detail pembayaran secara lengkap dan akurat, serta memiliki saldo atau limit yang cukup pada metode pembayaran yang Anda pilih untuk dapat digunakan dalam pembayaran pesanan Anda.{"\n"}{"\n"}
5. Kami berhak menolak atau menunda untuk meneruskan permintaan pembayaran Anda melalui Metode Pembayaran karena alasan tertentu, termasuk namun tidak terbatas pada adanya indikasi atau Kami mempunyai alasan yang cukup untuk menduga adanya kecurangan, penipuan, pelanggaran Ketentuan Penggunaan, pelanggaran atas peraturan perundang-undangan yang berlaku termasuk yang terkait dengan alat pembayaran menggunakan kartu, uang elektronik, pemrosesan transaksi pembayaran, anti pencucian uang, korupsi dan pencegahan pendanaan terorisme, atau tindakan lain yang tidak wajar atau mencurigakan, termasuk belum dipenuhinya kewajiban Anda kepada Kami.{"\n"}{"\n"}

<Text style={{color: '#6BB745', fontSize: 18, fontFamily: 'poppins-semi-bold'}}>Hak Kekayaan Intelektual</Text>{"\n"}{"\n"}
Platform Kami, termasuk nama dan logonya, kode, desain, teknologi, model bisnis, dilindungi oleh hak cipta, merek, dan hak kekayaan intelektual lainnya yang tersedia berdasarkan hukum Republik Indonesia yang telah terdaftar atas nama Kami. Kami (dan pihak yang memperoleh lisensi dari Kami, jika berlaku) memiliki seluruh hak dan kepentingan atas Platform Kami, termasuk seluruh hak kekayaan intelektual terkait dengan seluruh fitur Layanan yang terdapat di dalamnya dan hak kekayaan intelektual lainnya yang terkait.{"\n"}{"\n"}
Tunduk pada kepatuhan Anda pada Syarat dan Ketentuan ini, Kami memberikan kepada Anda lisensi terbatas, non-eksklusif, yang tidak dapat dipindahtangankan, tidak dapat dialihkan, dan tidak dapat disublisensikan dan yang dapat ditarik kembali untuk mengunduh dan menggunakan perangkat lunak yang digunakan dalam Aplikasi Creekgarden pada Ponsel Pintar yang Anda miliki atau kontrol untuk kebutuhan Anda.{"\n"}{"\n"}
Anda tidak diperkenankan (i) menyalin, memodifikasi, mengadaptasi, menerjemahkan, membuat karya turunan dari, mendistribusikan, memberikan lisensi, menjual, mengalihkan, menampilkan di muka umum, membuat ulang, mentransmisikan, memindahkan, menyiarkan, menguraikan, atau membongkar bagian manapun dari atau dengan cara lain mengeksploitasi Platform Creekgarden (termasuk Layanan di dalamnya) yang dilisensikan kepada Anda, kecuali sebagaimana diperbolehkan dalam Syarat dan Ketentuan ini, (ii) memberikan lisensi, mensublisensikan, menjual, menjual kembali, memindahkan, mengalihkan, mendistribusikan atau mengeksploitasi secara komersial atau membuat tersedia kepada pihak ketiga Platform Creekgarden atau perangkat lunak dengan cara; (iii) menciptakan "link" internet ke Platform Creekgarden atau "frame" atau "mirror" setiap perangkat lunak pada server lain atau perangkat nirkabel atau yang berbasis internet; (iv) merekayasa ulang atau mengakses perangkat lunak Kami untuk (a) membangun produk atau layanan tandingan, (b) membangun produk dengan menggunakan ide, fitur, fungsi atau grafis sejenis Platform Creekgarden, atau (c) menyalin ide, fitur, fungsi atau grafis Platform Creekgarden, (v) meluncurkan program otomatis atau script, termasuk, namun tidak terbatas pada, web spiders, web crawlers, web robots, web ants, web indexers, bots, virus atau worm, atau segala program apapun yang mungkin membuat beberapa permintaan server per detik, atau menciptakan beban berat atau menghambat operasi dan/atau kinerja Platform Creekgarden, (vi) menggunakan robot, spider, pencarian situs/aplikasi pengambilan kembali, atau perangkat manual atau otomatis lainnya atau proses untuk mengambil, indeks, "tambang data" (data mine), atau dengan cara apapun memperbanyak atau menghindari struktur navigasi atau presentasi dari aplikasi atau isinya; (vii) menerbitkan, mendistribusikan atau memperbanyak dengan cara apapun materi yang dilindungi hak cipta, merek dagang, atau informasi yang Kami miliki lainnya tanpa memperoleh persetujuan terlebih dahulu dari Kami atau pemilik hak yang melisensikan hak-nya kepada Kami, (viii) menghapus setiap hak cipta, merek dagang atau pemberitahuan hak milik lainnya yang terkandung dalam Platform Creekgarden.{"\n"}{"\n"}

<Text style={{color: '#6BB745', fontSize: 18, fontFamily: 'poppins-semi-bold'}}>Hubungi Kami</Text>{"\n"}{"\n"}
Kami dengan senang hati akan menerima pesan, keluhan dan saran Anda, baik untuk Creekgarden maupun untuk disampaikan kepada produsen, serta berusaha menanggapi dan menyelesaikan segala keluhan Anda sebaik dan sesegera mungkin. Segala keluhan dapat ditujukan ke :{"\n"}{"\n"}

Email : admin@creekgarden.co.id{"\n"}
Nomor Whatsapp : +6287777575231{"\n"}{"\n"}

<Text style={{color: '#6BB745', fontSize: 18, fontFamily: 'poppins-semi-bold'}}>Lain-Lain</Text>{"\n"}{"\n"}
1. Anda tidak dapat mengalihkan hak dan kewajiban Anda berdasarkan Syarat dan Ketentuan ini tanpa persetujuan sebelumnya dari Kami.{"\n"}{"\n"}
2. Dalam hal terdapat istilah dalam Syarat dan Ketentuan yang dianggap tidak sah, tidak berlaku, atau tidak dapat dilaksanakan, baik secara keseluruhan atau sebagian berdasarkan ketentuan perundang-undangan, istilah atau bagian dari istilah tersebut akan dianggap bukan bagian dari Syarat dan Ketentuan ini, namun keabsahan dan keberlakuan terhadap yang lainnya dari Syarat dan Ketentuan akan tetap sah.{"\n"}{"\n"}
3. Syarat dan Ketentuan ini diatur dan dibuat berdasarkan Hukum Republik Indonesia. Kami dan Anda dengan ini memilih yurisdiksi kepaniteraan Pengadilan Negeri Jakarta Selatan.{"\n"}{"\n"}
4. Kami berhak mengubah Syarat dan Ketentuan ini sewaktu-waktu.{"\n"}{"\n"}
5. Dalam hal terjadi perubahan secara substantif dari Syarat dan Ketentuan ini, Kami akan mempublikasi kepada pengguna. Jika Anda melanjutkan untuk menggunakan dan mengakses Platform setiap publikasi tersebut, Anda akan dianggap menyetujui perubahan yang terjadi.{"\n"}
                </Text>
            </View>
        </ScrollView>
    );

}
LandingPage.navigationOptions = {
    headerTitle: <Text style={{ fontSize: 18, fontFamily: 'poppins-bold'}}>Privasi dan Kebijakan</Text>,
    headerTitleAlign: 'center',
    headerTintColor: '#000',
    headerBackTitle: <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'poppins-regular', color: 'white'}}>.</Text>,
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 0.84 / 1,
    },
    text: {
        fontFamily: 'poppins-semibold-landing',
        color: '#397A18',
        fontWeight: '300',
        textAlign: 'center',
        marginTop: '5%'
    },
    imageBg: {
        // flex: 1,
        justifyContent: "center",
        padding: '5%'
    },
    imageBg2: {
        // flex: 1,
        justifyContent: "center",
        marginTop: '4%',
        padding: '5%'
    },
});

export default LandingPage;