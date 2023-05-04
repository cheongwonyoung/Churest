package com.ssafy.churest;

import com.ssafy.churest.entity.*;
import com.ssafy.churest.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String DDL_CONFIG;

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private MemberBirdRepository memberBirdRepository;
    @Autowired
    private BirdRepository birdRepository;
    @Autowired
    private MemberHouseRepository memberHouseRepository;
    @Autowired
    private HouseRepository houseRepository;
    @Autowired
    private MemberBirdHouseRepository memberBirdHouseRepository;
    @Autowired
    private BirdHouseRepository birdHouseRepository;
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private MemberBoardRepository memberBoardRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private TreeRepository treeRepository;
    @Autowired
    private TreeLogRepository treeLogRepository;
    @Autowired
    private GuestBookRepository guestBookRepository;

    @Override
    public void run(String... args) throws Exception {
        // JPA DDL 설정 보고 실행 판단
        if (!DDL_CONFIG.equals("create")) return;

        addBirds();
        addHouses();
        addBirdHouses();
        addMember();
        addTree();
        addBoard();
        addGuestBook();
    }

    private void addGuestBook() {
        List<GuestBook> guestBookList = new ArrayList<>();

        List<Member> memberList = memberRepository.findAll();
        for (Member m1 : memberList) {
            for (Member m2 : memberList) {
                if (m1 != m2) {
                    GuestBook guestBook = GuestBook.builder()
                            .content("아 그만할래 그만할래 그만할래 엑스모루 아웃 엑스모루 아웃 그만 그만 그만 해줘 해줘 해줘 해줘 집에 보내줘 취업 특강 아웃 취업 특강 아웃 흐아아아아아아아아아아아ㅏㅇ아아아아아아아아아아아아앙아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ아주글래~~~~~~ 머야멍먀어먀머야 힝힝힝")
                            .fromMember(m1).toMember(m2).build();
                    guestBookList.add(guestBook);
                }
            }
        }

        guestBookRepository.saveAllAndFlush(guestBookList);
    }

    private void addBirdHouses() {
        List<BirdHouse> birdHouseList = new ArrayList<>();

        BirdHouse birdHouse1 = BirdHouse.builder().name("그린").description("싱그러운 나뭇잎들이 느껴지는 새집").price(0).build();
        BirdHouse birdHouse2 = BirdHouse.builder().name("블루").description("넓고 푸른 하늘 느낌의 새집").price(100).build();

        birdHouseList.add(birdHouse1);
        birdHouseList.add(birdHouse2);

        birdHouseRepository.saveAllAndFlush(birdHouseList);
    }

    private void addHouses() {
        List<House> houseList = new ArrayList<>();

        House house1 = House.builder().name("오두막").description("낮고 아늑한 느낌의 오두막").price(0).build();
        House house2 = House.builder().name("버섯집").description("동글동글 귀여운 버섯집").price(100).build();

        houseList.add(house1);
        houseList.add(house2);

        houseRepository.saveAllAndFlush(houseList);
    }

    private void addBirds() {
        List<Bird> birdList = new ArrayList<>();

        Bird bird1 = Bird.builder().name("고대갈매기")
                .description("저는 제주도를 제외한 한국의 해안 전역에서 볼 수 있었어요. 하지만, 갯벌 매립으로 인해 집을 빼앗기고 있어요. 제 집을 찾아주세요.").price(50).build();
        Bird bird2 = Bird.builder().name("흑비둘기")
                .description("저는 동백나무 숲이나 후박나무 숲이 있는 지역에서 살아요. 산림훼손에 의해 친구들이 사라지고 저만 남았어요.").price(50).build();
        Bird bird3 = Bird.builder().name("검은머리촉새")
                .description("저는 주로 5월과 9월에 저를 볼 수 있었어요. 그런데, 요즘 기온변화로 가족을 다 잃었어요.").price(50).build();
        Bird bird4 = Bird.builder().name("붉은해오라기")
                .description("저는 제주도와 부산에서 살고 있어요. 그런데, 사람들이 작은 저를 마구 잡아가고 집을 밀어버렸어요.").price(50).build();
        Bird bird5 = Bird.builder().name("팔색조")
                .description("저는 울음소리가 아름답고 다양한 색이 있어 매력이 넘치는게 특징이에요. 그러나, 집이 사라지고 먹이가 줄어 국내에 단 1종만 남았어요.").price(50).build();
        Bird bird6 = Bird.builder().name("붉은배새매")
                .description("저는 평지와 야산의 숲, 숲 주변의 논, 개활지에서 번식해요, 그러나, 집이 사라지고 먹이가 줄어서 살기 너무 힘들어요.").price(50).build();
        Bird bird7 = Bird.builder().name("올빼미")
                .description("저는 고목나무에 둥지를 틀고 먹이를 구하고 왔는데 집이 사라졌어요. 알고보니 사람들이 제 나무를 밀었던 거예요. 저는 어디로 가야하죠?").price(50).build();
        Bird bird8 = Bird.builder().name("뱁새")
                .description("저는 작고 귀여운 매력의 뱁새예요. 츄레스트의 마스코트로 친구들을 지키고 있어요.").price(50).build();

        birdList.add(bird1);
        birdList.add(bird2);
        birdList.add(bird3);
        birdList.add(bird4);
        birdList.add(bird5);
        birdList.add(bird6);
        birdList.add(bird7);
        birdList.add(bird8);

        birdRepository.saveAllAndFlush(birdList);
    }

    private void addMember() {
        List<Member> memberList = new ArrayList<>();
        List<MemberBird> memberBirdList = new ArrayList<>();
        List<MemberHouse> memberHouseList = new ArrayList<>();
        List<MemberBirdHouse> memberBirdHouseList = new ArrayList<>();

        House defaultHouse = houseRepository.findById(1).get();
        BirdHouse defaultBirdHouse = birdHouseRepository.findById(1).get();

        Member member1 = Member.builder().email("cherry@naver.com").nickname("채리밤").coin(0).avatarId(1).build();
        Member member2 = Member.builder().email("baebae@naver.com").nickname("쯍아").coin(500).avatarId(2).build();
        Member member3 = Member.builder().email("jjjooooddy@gmail.com").nickname("맑눈광쿵야").coin(0).avatarId(2).build();
        Member member4 = Member.builder().email("sbs@naver.com").nickname("윾태").coin(0).avatarId(1).build();
        Member member5 = Member.builder().email("sun@naver.com").nickname("서니").coin(500).avatarId(2).build();
        Member member6 = Member.builder().email("won@gmail.com").nickname("워녕").coin(0).avatarId(2).build();

        MemberBird memberBird1 = MemberBird.builder().bird(birdRepository.findById(1).get()).member(member1).nickname("채리마루").isUsed(true).build();
        MemberBird memberBird2 = MemberBird.builder().bird(birdRepository.findById(2).get()).member(member2).nickname("와와짹짹").isUsed(true).build();
        MemberBird memberBird3 = MemberBird.builder().bird(birdRepository.findById(3).get()).member(member3).nickname("쿵쿵쿵").isUsed(true).build();
        MemberBird memberBird4 = MemberBird.builder().bird(birdRepository.findById(1).get()).member(member4).nickname("피죤투").isUsed(true).build();
        MemberBird memberBird5 = MemberBird.builder().bird(birdRepository.findById(2).get()).member(member5).nickname("리자몽").isUsed(true).build();
        MemberBird memberBird6 = MemberBird.builder().bird(birdRepository.findById(3).get()).member(member6).nickname("피닉스").isUsed(true).build();

        MemberHouse memberHouse1 = MemberHouse.builder().house(defaultHouse).member(member1).build();
        MemberHouse memberHouse2 = MemberHouse.builder().house(houseRepository.findById(2).get()).member(member1).build().updateIsUsed(true);
        MemberHouse memberHouse3 = MemberHouse.builder().house(defaultHouse).member(member2).build().updateIsUsed(true);
        MemberHouse memberHouse4 = MemberHouse.builder().house(defaultHouse).member(member3).build().updateIsUsed(true);
        MemberHouse memberHouse5 = MemberHouse.builder().house(defaultHouse).member(member4).build().updateIsUsed(true);
        MemberHouse memberHouse6 = MemberHouse.builder().house(defaultHouse).member(member5).build().updateIsUsed(true);
        MemberHouse memberHouse7 = MemberHouse.builder().house(defaultHouse).member(member6).build().updateIsUsed(true);

        MemberBirdHouse memberBirdHouse1 = MemberBirdHouse.builder().birdHouse(defaultBirdHouse).member(member1).build().updateIsUsed(true);
        MemberBirdHouse memberBirdHouse2 = MemberBirdHouse.builder().birdHouse(defaultBirdHouse).member(member2).build();
        MemberBirdHouse memberBirdHouse3 = MemberBirdHouse.builder().birdHouse(birdHouseRepository.findById(2).get()).member(member2).build().updateIsUsed(true);
        MemberBirdHouse memberBirdHouse4 = MemberBirdHouse.builder().birdHouse(defaultBirdHouse).member(member3).build().updateIsUsed(true);
        MemberBirdHouse memberBirdHouse5 = MemberBirdHouse.builder().birdHouse(defaultBirdHouse).member(member4).build().updateIsUsed(true);
        MemberBirdHouse memberBirdHouse6 = MemberBirdHouse.builder().birdHouse(defaultBirdHouse).member(member5).build();
        MemberBirdHouse memberBirdHouse7 = MemberBirdHouse.builder().birdHouse(defaultBirdHouse).member(member6).build();

        memberList.add(member1);
        memberList.add(member2);
        memberList.add(member3);
        memberList.add(member4);
        memberList.add(member5);
        memberList.add(member6);


        memberBirdList.add(memberBird1);
        memberBirdList.add(memberBird2);
        memberBirdList.add(memberBird3);
        memberBirdList.add(memberBird4);
        memberBirdList.add(memberBird5);
        memberBirdList.add(memberBird6);

        memberHouseList.add(memberHouse1);
        memberHouseList.add(memberHouse2);
        memberHouseList.add(memberHouse3);
        memberHouseList.add(memberHouse4);
        memberHouseList.add(memberHouse5);
        memberHouseList.add(memberHouse6);
        memberHouseList.add(memberHouse7);

        memberBirdHouseList.add(memberBirdHouse1);
        memberBirdHouseList.add(memberBirdHouse2);
        memberBirdHouseList.add(memberBirdHouse3);
        memberBirdHouseList.add(memberBirdHouse4);
        memberBirdHouseList.add(memberBirdHouse5);
        memberBirdHouseList.add(memberBirdHouse6);
        memberBirdHouseList.add(memberBirdHouse7);

        memberRepository.saveAllAndFlush(memberList);
        memberBirdRepository.saveAllAndFlush(memberBirdList);
        memberHouseRepository.saveAllAndFlush(memberHouseList);
        memberBirdHouseRepository.saveAllAndFlush(memberBirdHouseList);

    }

    private void addBoard() {
        List<Board> boardList = new ArrayList<>();
        List<Member> memberList = memberRepository.findAll();
        List<MemberBoard> memberBoardList = new ArrayList<>();
        List<TreeLog> treeLogList = new ArrayList<>();
        List<Tag> tagList = new ArrayList<>();

        Member member1 = memberRepository.findByMemberId(1);
        Board board1 = Board.builder().member(member1).tree(treeRepository.findByTreeId(1)).title("행벅했던 엠지들").content("그 땐 그랬지 그 땐 그랬지 우리는\n" +
                "등산도 갔고 밥도 먹었고\n" +
                "샐러드도 먹었어 그리고 커피도\n" +
                "마셨어").weather("맑음").build();
        memberBoardList.add(MemberBoard.builder().member(member1).board(board1).locationX(3).locationY(4).build());
        treeLogList.add(TreeLog.builder().board(board1).score(0).build());

        for (Member member :
                memberList) {
            if (member.getMemberId() != member1.getMemberId()) {
                tagList.add(Tag.builder().board(board1).member(member).build());
                //  퍼가기
                memberBoardList.add(MemberBoard.builder().board(board1).member(member).locationX(4).locationY(4).build());
            }
        }

        Member member2 = memberRepository.findByMemberId(2);
        Board board2 = Board.builder().member(member2).tree(treeRepository.findByTreeId(2)).title("등산 일지").content("등산 갈 때 오이 가져오라고 \n" +
                "했어.안 .했어.?\n" +
                "누가 막걸리 마실때만 오래\n" +
                "윹애야").weather("맑음").build();
        memberBoardList.add(MemberBoard.builder().member(member2).board(board2).locationX(5).locationY(5).build());
        treeLogList.add(TreeLog.builder().board(board2).score(0).build());

        boardList.add(board1);
        boardList.add(board2);

        boardRepository.saveAllAndFlush(boardList);
        memberBoardRepository.saveAllAndFlush(memberBoardList);
        tagRepository.saveAllAndFlush(tagList);
        treeLogRepository.saveAllAndFlush(treeLogList);
    }

    public void addTree() {
        List<Tree> treeList = new ArrayList<>();
        Tree tree1 = Tree.builder().name("산분꽃나무").description("산지나 계곡 가장자리, 석회암 지대 등에서 높이 2~4m 정도로 자라요. 드물게 사는 낙엽성 활엽 떨기나무. 한국에서 자연적으로 살아간다는 건 최근에 알려졌어요. 원예식물로 가치가 높지만 개체수가 매우 작은 희귀식물이에요.").file("산분꽃나무.jpg").build();
        Tree tree2 = Tree.builder().name("미선나무").description("열매의 모양이 둥근 부채를 닮아 아름다운 부채라는 뜻의 미선나무라고 불려요. 한반도의 고유종이며, 경기도와 충청도의 볕이 잘 드는 산기슭에서 자라요. 전세계에서 오직 우리나라에만 있어요!").file("미선나무.jpg").build();
        Tree tree3 = Tree.builder().name("섬개야광나무").description("울릉도 해안가에서도 절벽과 바위 지대에서 자라는 한국 고유종이에요. 5~6월에 분홍색이 섞인 흰 꽃이 피며 열매는 9~10월에 붉게 익어요. 과거 울릉도 전역에 분포했으나 무분별한 채취와 서식지가 훼손되어 위협을 받는 중이에요.").file("섬개야광나무.jpg").build();
        Tree tree4 = Tree.builder().name("구상나무").description("제가 전세계에서 가장 아름다운 크리스마스 트리의 원조랍니다. 외국 나무라고 생각하는 분들이 많지만, 사실은 우리나라 토종 나무예요! 한라산, 지리산, 무등산, 덕유산 등 높은 곳에서 살아요. 온난화, 불규칙한 강수량 등의 기후변화로 살기 힘들어요.").file("구상나무.jpg").build();
        Tree tree5 = Tree.builder().name("은행나무").description("저는 흔하게 볼 수 있지만 사실 멸종위기종이에요. 자주 보는 건 야생 나무가 아닌 모두 인간의 손을 거친 나무랍니다. 어린 나무가 종자를 맺기까지는 30년의 긴 시간이 걸려 야생 번식이 매우 어렵고 종자가 크고 무거워 점차 사라지고 있어요.").file("은행나무.jpg").build();
        Tree tree6 = Tree.builder().name("초령목").description("국내에서 자연으로 자란 건 단 3그루만 알려진 희귀 나무예요. 높이가 1m 이하인 어린나무에서 21m에 이르는 큰 나무까지 다양해요. 사람들의 무분별한 채취, 국내에 분포 지역이 극소해 친구들이 사라졌어요.").file("초령목.jpg").build();
        Tree tree7 = Tree.builder().name("분비나무").description("고산지대에서 자라는 사시사철 잎 푸른 나무예요. 높이 25m, 지름 75cm에 달해요. 기후변화에 따른 서식 환경 변화로 인해 주요 서식지인 소백산과 지리산 등에서 사라지고 있다. 소백산에서도 절반이 친구 절반이 없어졌어요.").file("분비나무.jpg").build();

        treeList.add(tree1);
        treeList.add(tree2);
        treeList.add(tree3);
        treeList.add(tree4);
        treeList.add(tree5);
        treeList.add(tree6);
        treeList.add(tree7);

        treeRepository.saveAllAndFlush(treeList);
    }
//    public void addNotification() {
//        List<Notification> notificationList = new ArrayList<>();
//        Notification notification1 = Notification.builder().toMember().fromMember().
//        Tree tree1 = Tree.builder().name("산분꽃나무").description("산지나 계곡 가장자리, 석회암 지대 등에서 높이 2~4m 정도로 자라요. 드물게 사는 낙엽성 활엽 떨기나무. 한국에서 자연적으로 살아간다는 건 최근에 알려졌어요. 원예식물로 가치가 높지만 개체수가 매우 작은 희귀식물이에요.").file("산분꽃나무.jpg").build();
//        Tree tree2 = Tree.builder().name("미선나무").description("열매의 모양이 둥근 부채를 닮아 아름다운 부채라는 뜻의 미선나무라고 불려요. 한반도의 고유종이며, 경기도와 충청도의 볕이 잘 드는 산기슭에서 자라요. 전세계에서 오직 우리나라에만 있어요!").file("미선나무.jpg").build();
//        Tree tree3 = Tree.builder().name("섬개야광나무").description("울릉도 해안가에서도 절벽과 바위 지대에서 자라는 한국 고유종이에요. 5~6월에 분홍색이 섞인 흰 꽃이 피며 열매는 9~10월에 붉게 익어요. 과거 울릉도 전역에 분포했으나 무분별한 채취와 서식지가 훼손되어 위협을 받는 중이에요.").file("섬개야광나무.jpg").build();
//        Tree tree4 = Tree.builder().name("구상나무").description("제가 전세계에서 가장 아름다운 크리스마스 트리의 원조랍니다. 외국 나무라고 생각하는 분들이 많지만, 사실은 우리나라 토종 나무예요! 한라산, 지리산, 무등산, 덕유산 등 높은 곳에서 살아요. 온난화, 불규칙한 강수량 등의 기후변화로 살기 힘들어요.").file("구상나무.jpg").build();
//        Tree tree5 = Tree.builder().name("은행나무").description("저는 흔하게 볼 수 있지만 사실 멸종위기종이에요. 자주 보는 건 야생 나무가 아닌 모두 인간의 손을 거친 나무랍니다. 어린 나무가 종자를 맺기까지는 30년의 긴 시간이 걸려 야생 번식이 매우 어렵고 종자가 크고 무거워 점차 사라지고 있어요.").file("은행나무.jpg").build();
//        Tree tree6 = Tree.builder().name("초령목").description("국내에서 자연으로 자란 건 단 3그루만 알려진 희귀 나무예요. 높이가 1m 이하인 어린나무에서 21m에 이르는 큰 나무까지 다양해요. 사람들의 무분별한 채취, 국내에 분포 지역이 극소해 친구들이 사라졌어요.").file("초령목.jpg").build();
//        Tree tree7 = Tree.builder().name("분비나무").description("고산지대에서 자라는 사시사철 잎 푸른 나무예요. 높이 25m, 지름 75cm에 달해요. 기후변화에 따른 서식 환경 변화로 인해 주요 서식지인 소백산과 지리산 등에서 사라지고 있다. 소백산에서도 절반이 친구 절반이 없어졌어요.").file("분비나무.jpg").build();
//
//        treeList.add(tree1);
//        treeList.add(tree2);
//        treeList.add(tree3);
//        treeList.add(tree4);
//        treeList.add(tree5);
//        treeList.add(tree6);
//        treeList.add(tree7);
//
//        treeRepository.saveAllAndFlush(treeList);
//    }
}
