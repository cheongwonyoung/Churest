package com.ssafy.churest;

import com.ssafy.churest.entity.Bird;
import com.ssafy.churest.repository.BirdRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
public class DataLoader implements CommandLineRunner {

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String DDL_CONFIG;
    private BirdRepository birdRepository;
    @Override
    public void run(String... args) throws Exception {
        // JPA DDL 설정 보고 실행 판단
        if (!DDL_CONFIG.equals("create")) return;

        addBirds();
    }

    private void addBirds() {
        List<Bird> birdList = new ArrayList<>();

        Bird bird1 = Bird.builder().name("고대갈매기")
                .description("저는 제주도를 제외한 한국의 해안 전역에서 볼 수 있었어요. 하지만, 갯벌 매립으로 인해 집을 빼앗기고 있어요. 제 집을 찾아주세요.").price(5).build();
        Bird bird2 = Bird.builder().name("흑비둘기")
                .description("저는 동백나무 숲이나 후박나무 숲이 있는 지역에서 살아요. 산림훼손에 의해 친구들이 사라지고 저만 남았어요.").price(5).build();
        Bird bird3 = Bird.builder().name("검은머리촉새")
                .description("저는 주로 5월과 9월에 저를 볼 수 있었어요. 그런데, 요즘 기온변화로 가족을 다 잃었어요.").price(10).build();
        Bird bird4 = Bird.builder().name("붉은해오라기")
                .description("저는 제주도와 부산에서 살고 있어요. 그런데, 사람들이 작은 저를 마구 잡아가고 집을 밀어버렸어요.").price(10).build();
        Bird bird5 = Bird.builder().name("팔색조")
                .description("저는 울음소리가 아름답고 다양한 색이 있어 매력이 넘치는게 특징이에요. 그러나, 집이 사라지고 먹이가 줄어 국내에 단 1종만 남았어요.").price(20).build();
        Bird bird6 = Bird.builder().name("붉은배새매")
                .description("저는 평지와 야산의 숲, 숲 주변의 논, 개활지에서 번식해요, 그러나, 집이 사라지고 먹이가 줄어서 살기 너무 힘들어요.").price(20).build();
        Bird bird7 = Bird.builder().name("올빼미")
                .description("저는 고목나무에 둥지를 틀고 먹이를 구하고 왔는데 집이 사라졌어요. 알고보니 사람들이 제 나무를 밀었던 거예요. 저는 어디로 가야하죠?").price(30).build();
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
}
